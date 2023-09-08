export interface IQuestionary {
  name: string;
  description: string;
  questions: IQuestion[];
  answers: IAnswer[];
}

export interface IQuestion {
  text: string;
}

export interface IAnswer {
  value: number;
  text:
    | "Rara vez o Nada"
    | "Algunas veces o poco"
    | "La mayor parte del tiempo o bastante"
    | "Siempre o totalmente"
    | "No existe o definitivamente no"
    | "Existe de manera informal o solo en alguna medida"
    | "Está documentado pero no esá implantado o en gran medida"
    | "Está documentado e implantado o definitivamente si";
}

export interface IUser {
  name: string;
  email: string;
  phone: string;
  questionaries: IAnsweredQuestionary[];
}

export interface IAnsweredQuestionary {
  questionaryId: string;
  responses: IAnsweredQuestion[];
}

export interface IAnsweredQuestion {
  questionId: string;
  value: number;
}
