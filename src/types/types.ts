export interface QustionInterface {
  id: string;
  qustionDetail: string;
}

export interface UserQuestionInterface {
  id: string;
  qustionID: string;
  answerHistory: string[];

}



interface UserInterface {
  role: "admin" | "participant"
}
export interface AdminInterface extends UserInterface {
  id: string;
  qustion: string;
  role: "admin"
  questions: QustionInterface[]
}
export interface ParticipantInterface extends UserInterface {
  id: string;
  qustion: string;
  role: "participant"
  questions: UserQuestionInterface[]
}

