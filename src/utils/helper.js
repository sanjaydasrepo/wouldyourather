export function getUnAnsweredQuestions (answeredIds, questions) {
  if (questions.length === 0 && answeredIds.length === 0) return [];

  let unAnswered = [];

  for (const key in questions) {
    if (questions.hasOwnProperty (key)) {
      const element = questions[key];
      if (!answeredIds.includes (element.id)) unAnswered.push (element);
    }
  }

  unAnswered.sort ((a, b) => b.timestamp - a.timestamp);

  const ids = unAnswered.map (a => a.id);
  return ids;
}

export function getAnsweredQuestions (answeredIds, questions) {
  if (questions.length === 0 && answeredIds.length === 0) return [];

  let answered = [];

  for (const key in questions) {
    if (questions.hasOwnProperty (key)) {
      const element = questions[key];
      if (answeredIds.includes (element.id)) answered.push (element);
    }
  }

  answered.sort ((a, b) => b.timestamp - a.timestamp);
  const ids = answered.map (a => a.id);
  return ids;
}
export function getLoggedInUser (authedUser, users) {
  if (Object.keys (users).length === 0) return '';

  let userDet = users[authedUser];
  if (userDet) {
    return {
      id: userDet.id,
      name: userDet.name,
      avatar: userDet.avatarURL,
    };
  }
}
export function getOptionPrettifyText (text) {
  if (text && text.length > 15) {
    text = `${text.substring (0, 15)}`;
  }
  return text && `${text} ...`;
}
export function isQuestionAnswered (questions, id, authedUser) {

  if ( Object.keys(questions).length === 0 ) return false;

  const question = questions[id];
  const opt1 = question.optionOne.votes.find (v => v === authedUser);
  const opt2 = question.optionTwo.votes.find (v => v === authedUser);
  if (opt1 || opt2) return true;
  return false;
}
export function getQuestionStats (question, authedUser) {

  const uCount1 = question.optionOne.votes.length;
  const uCount2 = question.optionTwo.votes.length;

  const totalVotes = uCount1 + uCount2;

  let opt1Stats = {};
  let opt2Stats = {};

  opt1Stats.voteCount = uCount1;
  opt1Stats.percentage = Math.round (uCount1 / totalVotes * 100, 2);
  opt1Stats.text = question.optionOne.text;

  opt2Stats.voteCount = uCount2;
  opt2Stats.percentage = Math.round (uCount2 / totalVotes * 100, 2);
  opt2Stats.text = question.optionTwo.text;

  let votedOption = 'optionOne';

  const votedOption2 = question.optionTwo.votes.some (v => v === authedUser);

  if (votedOption2) votedOption = 'optionTwo';

  const stats = {
    totalVotes,
    opt1Stats,
    opt2Stats,
    votedOption,
  };

  return stats;
}

export function getLeaderBoardList (users) {
  let list = [];

  for (const key in users) {
    if (users.hasOwnProperty (key)) {
      const element = users[key];
      const answersCount = Object.keys (element.answers).length;
      const questionsCount = element.questions.length;

      const item = {
        id: element.id,
        name: element.name,
        avatar: element.avatarURL,
        answersCount: answersCount,
        questionCount: questionsCount,
        totalCount: answersCount + questionsCount,
      };
      list.push (item);
    }
  }

  list = list.sort ((a, b) => b.totalCount - a.totalCount);
  return list;
}
