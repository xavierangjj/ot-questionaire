'use client'

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus, X, Eye, Edit2, Languages, Trash2 } from 'lucide-react';

const INITIAL_FIXED_QUESTIONS = [
  {
    questionEn: "What is your name?",
    questionZh: "你叫什么名字？",
    optionsEn: ['', ''],
    optionsZh: ['', ''],
    correctAnswer: 0
  },
  {
    questionEn: "How old are you?",
    questionZh: "你今年几岁？",
    optionsEn: ['', ''],
    optionsZh: ['', ''],
    correctAnswer: 0
  },
  {
    questionEn: "What is your Birthday?",
    questionZh: "你的生日是几时？",
    optionsEn: ['', ''],
    optionsZh: ['', ''],
    correctAnswer: 0
  },
  {
    questionEn: "What is the current month?",
    questionZh: "现在是几月？",
    optionsEn: ['', ''],
    optionsZh: ['', ''],
    correctAnswer: 0
  },
  {
    questionEn: "What is the time now?",
    questionZh: "现在几点了？",
    optionsEn: ['', ''],
    optionsZh: ['', ''],
    correctAnswer: 0
  },
  {
    questionEn: "What is the day today?",
    questionZh: "今天是星期几？",
    optionsEn: ['', ''],
    optionsZh: ['', ''],
    correctAnswer: 0
  },
  {
    questionEn: "What is the current year?",
    questionZh: "今年是哪一年？",
    optionsEn: ['', ''],
    optionsZh: ['', ''],
    correctAnswer: 0
  },
  {
    questionEn: "What is this place?",
    questionZh: "这是什么哪里？",
    optionsEn: ['', ''],
    optionsZh: ['', ''],
    correctAnswer: 0
  },
  {
    questionEn: "Have you seen me before?",
    questionZh: "你以前见过我吗？",
    optionsEn: ["Yes", "No", "I'm not sure"],
    optionsZh: ["见过", "没见过", "我不确定"],
    correctAnswer: 0
  }
];

const MCQQuestionnaire = () => {
  const [questions, setQuestions] = useState([...INITIAL_FIXED_QUESTIONS]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [patientAnswers, setPatientAnswers] = useState<{ [key: number]: number }>({});
  const [isEnglish, setIsEnglish] = useState(true);

  const getOptionRows = (options : any) => {
    const rows = [];
    for (let i = 0; i < options.length; i += 4) {
      rows.push(options.slice(i, Math.min(i + 4, options.length)));
    }
    return rows;
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      questionEn: '',
      questionZh: '',
      optionsEn: ['', ''],
      optionsZh: ['', ''],
      correctAnswer: 0
    }]);
    setCurrentQuestionIndex(questions.length);
  };

  const deleteQuestion = () => {
    if (questions.length <= 1) return;
    const newQuestions = questions.filter((_, index) => index !== currentQuestionIndex);
    setQuestions(newQuestions);
    if (currentQuestionIndex === questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const addOption = () => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].optionsEn.push('');
    newQuestions[currentQuestionIndex].optionsZh.push('');
    setQuestions(newQuestions);
  };

  const deleteOption = (optionIndex : any) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].optionsEn.splice(optionIndex, 1);
    newQuestions[currentQuestionIndex].optionsZh.splice(optionIndex, 1);
    if (optionIndex < newQuestions[currentQuestionIndex].correctAnswer) {
      newQuestions[currentQuestionIndex].correctAnswer--;
    } else if (optionIndex === newQuestions[currentQuestionIndex].correctAnswer) {
      newQuestions[currentQuestionIndex].correctAnswer = 0;
    }
    setQuestions(newQuestions);
  };

  const updateQuestion = (lang : any, e : any) => {
    const newQuestions = [...questions];
    if (lang === 'en') {
      newQuestions[currentQuestionIndex].questionEn = e.target.value;
    } else {
      newQuestions[currentQuestionIndex].questionZh = e.target.value;
    }
    setQuestions(newQuestions);
  };

  const updateOption = (optionIndex : any, lang : any, e : any) => {
    const newQuestions = [...questions];
    if (lang === 'en') {
      newQuestions[currentQuestionIndex].optionsEn[optionIndex] = e.target.value;
    } else {
      newQuestions[currentQuestionIndex].optionsZh[optionIndex] = e.target.value;
    }
    setQuestions(newQuestions);
  };

  const setCorrectAnswer = (optionIndex : any) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].correctAnswer = optionIndex;
    setQuestions(newQuestions);
  };

  const handlePatientSelection = (optionIndex : any) => {
    setPatientAnswers({
      ...patientAnswers,
      [currentQuestionIndex]: optionIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Creator Mode UI
  const CreatorMode = () => {
    const currentOptions = isEnglish
      ? questions[currentQuestionIndex].optionsEn
      : questions[currentQuestionIndex].optionsZh;

    const optionRows = getOptionRows(currentOptions);

    return (
      <>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <textarea
              defaultValue={questions[currentQuestionIndex].questionEn}
              onBlur={(e) => updateQuestion('en', e)}
              placeholder="Enter question in English..."
              className="w-full text-xl p-4 rounded-md border border-input bg-background h-24 resize-none"
            />
            <textarea
              defaultValue={questions[currentQuestionIndex].questionZh}
              onBlur={(e) => updateQuestion('zh', e)}
              placeholder="输入中文问题..."
              className="w-full text-xl p-4 rounded-md border border-input bg-background h-24 resize-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          {optionRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${row.length}, 1fr)`
              }}
            >
              {row.map((option : any, index : any) => {
                const optionIndex = rowIndex * 4 + index;
                return (
                  <Card
                    key={optionIndex}
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg relative ${
                      questions[currentQuestionIndex].correctAnswer === optionIndex
                        ? 'bg-blue-50 ring-2 ring-blue-500'
                        : 'bg-white'
                    }`}
                    onClick={() => setCorrectAnswer(optionIndex)}
                  >
                    {questions[currentQuestionIndex].optionsEn.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-100 hover:bg-red-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOption(optionIndex);
                        }}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                    <div className="space-y-2">
                      <input
                        type="text"
                        defaultValue={questions[currentQuestionIndex].optionsEn[optionIndex]}
                        onBlur={(e) => updateOption(optionIndex, 'en', e)}
                        placeholder="English option"
                        className="w-full text-lg text-center p-2 bg-transparent border-none focus:outline-none focus:ring-0"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <input
                        type="text"
                        defaultValue={questions[currentQuestionIndex].optionsZh[optionIndex]}
                        onBlur={(e) => updateOption(optionIndex, 'zh', e)}
                        placeholder="中文选项"
                        className="w-full text-lg text-center p-2 bg-transparent border-none focus:outline-none focus:ring-0"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </Card>
                );
              })}
            </div>
          ))}

          <Button
            onClick={addOption}
            variant="outline"
            size="lg"
            className="w-full border-dashed"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Option
          </Button>
        </div>
      </>
    );
  };

  // Patient Mode UI
  const PatientMode = () => {
    const questionText = isEnglish
      ? questions[currentQuestionIndex].questionEn
      : questions[currentQuestionIndex].questionZh;

    const currentOptions = isEnglish
      ? questions[currentQuestionIndex].optionsEn
      : questions[currentQuestionIndex].optionsZh;

    const optionRows = getOptionRows(currentOptions);

    return (
      <>
        <div className="space-y-4">
          <h2 className="text-2xl font-medium">
            {questionText}
          </h2>
        </div>

        <div className="space-y-4">
          {optionRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(${row.length}, 1fr)`
              }}
            >
              {row.map((option : any, index : any) => {
                const optionIndex = rowIndex * 4 + index;
                return (
                  <Card
                    key={optionIndex}
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      patientAnswers[currentQuestionIndex] === optionIndex
                        ? 'bg-blue-50 ring-2 ring-blue-500'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handlePatientSelection(optionIndex)}
                  >
                    <div className="text-lg text-center">
                      {option}
                    </div>
                  </Card>
                );
              })}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="space-y-8">
        {/* Mode Toggles and Question Counter */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-medium text-gray-700">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            {!isPreviewMode && (
              <Button
                onClick={deleteQuestion}
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                disabled={questions.length <= 1}
                title={questions.length <= 1 ? "Cannot delete the last question" : "Delete this question"}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setIsEnglish(!isEnglish)}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <Languages className="h-5 w-5" />
              {isEnglish ? 'Switch to 中文' : 'Switch to English'}
            </Button>
            <Button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              {isPreviewMode ? (
                <>
                  <Edit2 className="h-5 w-5" />
                  Edit Mode
                </>
              ) : (
                <>
                  <Eye className="h-5 w-5" />
                  Preview Mode
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Question Content */}
        {isPreviewMode ? <PatientMode /> : <CreatorMode />}

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4">
          <Button
            onClick={previousQuestion}
            disabled={currentQuestionIndex === 0}
            size="lg"
            variant="outline"
            className="text-lg"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </Button>

          {!isPreviewMode && (
            <Button
              onClick={addQuestion}
              size="lg"
              variant="outline"
              className="text-lg"
            >
              Add Question
            </Button>
          )}

          <Button
            onClick={nextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            size="lg"
            variant="outline"
            className="text-lg"
          >
            Next
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MCQQuestionnaire;
