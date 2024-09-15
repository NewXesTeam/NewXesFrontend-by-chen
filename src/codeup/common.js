const get_problems = practice_id => {
    console.log(`Loading Paper ${practice_id}`)
    fetch(`/api/tiku/practice/problems?practice_code=${practice_id}`)
        .then(res => res.json())
        .then(data => {
            const problems = data.data.problems;
            console.log(problems);
            problems.forEach((problem, index) => {
                console.groupCollapsed(`${index + 1} ${problem.logicQuesTypeName}`)
                console.log(problem.content)
                if (problem.logicQuesTypeId == 9) {
                    problem.childList.forEach((child, childId) => {
                        console.group(`${index + 1}-${childId + 1} ${child.logicQuesTypeName}`)
                        console.log(child.content)
                        child.answerOptionList.forEach(option => {
                            option = option[0];
                            console.log(`${option.aoVal} ${option.content}`)
                        })
                        console.groupEnd()
                    })
                } else {
                    problem.answerOptionList.forEach(option => {
                        option = option[0];
                        console.log(`${option.aoVal} ${option.content}`)
                    })
                }
                console.groupEnd()
            });
        })
}