export interface QuestionInterface {
  id: string;
  questionTitle: string;
  answer: UserAnswerInterface;
}

export interface UserAnswerInterface {
  answerHistory: string[];
}



interface ProfileInterface {
  role: "admin" | "participant"
}
export interface AdminInterface extends ProfileInterface {
  id: string;
  qustion: string;
  role: "admin"
  questions: QuestionInterface[]
}
export interface ParticipantInterface extends ProfileInterface {
  id: string;
  role: "participant"

}

export interface AuthInterface {

  authenticated: boolean;
  roleType: "admin" | "participant" | "";
}

