import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    let copy = [...questions];
    const published = copy.filter(
        (question: Question): boolean => question.published
    );
    return published;
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    let copy = [...questions];
    const nonEmpty = copy.filter(
        (question: Question): boolean =>
            question.body !== "" ||
            question.expected !== "" ||
            question.options.length !== 0
    );
    return nonEmpty;
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const questionIndex = questions.findIndex(
        (question: Question): boolean => question.id === id
    );
    if (questionIndex === -1) {
        return null;
    }
    return questions[questionIndex];
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    let copy = [...questions];
    const questionIndex = copy.findIndex(
        (question: Question): boolean => question.id === id
    );
    if (questionIndex === -1) {
        return copy;
    }
    copy.splice(questionIndex, 1);
    return copy;
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    let copy = [...questions];
    const names = copy.map((question: Question): string => question.name);
    return names;
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let copy = [...questions];
    const total = copy.reduce(
        (currentTotal: number, question: Question) =>
            currentTotal + question.points,
        0
    );
    return total;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    let copy = [...questions];
    const published = copy.filter(
        (question: Question): boolean => question.published
    );
    const total = published.reduce(
        (currentTotal: number, question: Question) =>
            currentTotal + question.points,
        0
    );
    return total;
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let copy = [...questions];
    const header = "id,name,options,points,published";
    const table = copy
        .map((question: Question): string =>
            [
                question.id.toString(),
                question.name,
                question.options.length.toString(),
                question.points.toString(),
                question.published
            ].join(",")
        )
        .join("\n");
    return header + "\n" + table;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    let copy = [...questions];
    return copy.map(
        (question: Question): Answer => ({
            questionId: question.id,
            text: "",
            submitted: false,
            correct: false
        })
    );
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    let copy = [...questions];
    return copy.map(
        (question: Question): Question => ({ ...question, published: true })
    );
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    const allMult = questions.every(
        (question: Question): boolean =>
            question.type === "multiple_choice_question"
    );
    const allShort = questions.every(
        (question: Question): boolean =>
            question.type === "short_answer_question"
    );
    return allMult || allShort;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    let copy = [...questions];
    copy.splice(questions.length, 0, makeBlankQuestion(id, name, type));
    return copy;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    let copy = [...questions];
    return copy.map(
        (question: Question): Question =>
            question.id === targetId ? { ...question, name: newName } : question
    );
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    let copy = [...questions];
    const targetIndex = copy.findIndex(
        (question: Question): boolean => question.id === targetId
    );
    if (newQuestionType === "short_answer_question") {
        copy[targetIndex] = {
            ...questions[targetIndex],
            type: newQuestionType,
            options: []
        };
        return copy;
    }
    copy[targetIndex] = { ...questions[targetIndex], type: newQuestionType };
    return copy;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    let copy = [...questions];
    const targetIndex = copy.findIndex(
        (question: Question): boolean => question.id === targetId
    );
    let copyOptions = [...copy[targetIndex].options];
    if (targetOptionIndex === -1) {
        copyOptions = [...copyOptions, newOption];
    } else {
        copyOptions.splice(targetOptionIndex, 1, newOption);
    }
    copy[targetIndex] = { ...copy[targetIndex], options: copyOptions };
    return copy;
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    let copy = [...questions];
    const targetIndex = copy.findIndex(
        (question: Question): boolean => question.id === targetId
    );
    let duplicated = duplicateQuestion(newId, copy[targetIndex]);
    copy.splice(targetIndex + 1, 0, duplicated);
    return copy;
}
