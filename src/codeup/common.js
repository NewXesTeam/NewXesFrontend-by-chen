const _debug_print_problems = practice_id => {
    console.log(`Loading Paper ${practice_id}`);
    fetch(`/api/tiku/practice/problems?practice_code=${practice_id}`)
        .then(res => res.json())
        .then(data => {
            const problems = data.data.problems;
            console.log(problems);
            problems.forEach((problem, index) => {
                console.groupCollapsed(
                    `${index + 1} ${problem.logicQuesTypeName}`
                );
                console.log(problem.content);
                if (problem.logicQuesTypeId == 9) {
                    problem.childList.forEach((child, childId) => {
                        console.group(
                            `${index + 1}-${childId + 1} ${
                                child.logicQuesTypeName
                            }`
                        );
                        console.log(child.content);
                        child.answerOptionList.forEach(option => {
                            option = option[0];
                            console.log(`${option.aoVal} ${option.content}`);
                        });
                        console.groupEnd();
                    });
                } else {
                    problem.answerOptionList.forEach(option => {
                        option = option[0];
                        console.log(`${option.aoVal} ${option.content}`);
                    });
                }
                console.groupEnd();
            });
        });
};

const get_problems = practice_id => {
    console.log(`Loading Paper ${practice_id}`);
    let paper_problems = [];
    fetch(`/api/tiku/practice/problems?practice_code=${practice_id}`)
        .then(res => res.json())
        .then(data => {
            const problems = data.data.problems;

            problems.forEach((problem, index) => {
                let options = [];
                let sub_questions = [];

                switch (problem.logicQuesTypeId) {
                    case "1":
                        problem.answerOptionList.forEach(option => {
                            options.push({
                                option_value: option[0].aoVal,
                                content: option[0].content,
                            });
                        });

                        break;
                    case "9":
                        problem.childList.forEach((child, childId) => {
                            let sub_options = [];

                            child.answerOptionList.forEach(option => {
                                sub_options.push({
                                    option_value: option[0].aoVal,
                                    content: option[0].content,
                                });
                            });

                            sub_questions.push({
                                parent_problem_id: index + 1,
                                problem_id: childId + 1,
                                problem_type_id: Number(child.logicQuesTypeId),
                                problem_type_name: child.logicQuesTypeName,
                                content: child.content,
                                options: sub_options,
                            });
                        });

                        break;
                    default:
                        break;
                }

                paper_problems.push({
                    problem_id: index + 1,
                    problem_type_id: Number(problem.logicQuesTypeId),
                    problem_type_name: problem.logicQuesTypeName,
                    content: problem.content,
                    options: options,
                    sub_questions: sub_questions,
                });
            });
        });
    console.log(paper_problems);
};
