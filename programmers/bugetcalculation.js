// https://programmers.co.kr/learn/courses/30/lessons/43237
// 이분탐색, 예산

// 채점 결과
// 정확성: 
// 합계: 

function solution(budgets, M) {
    let sortedBudgets = budgets.sort((a, b) => a - b);
    let length = budgets.length;

    let low = 0;
    let high = M;

    let limit = low + Math.floor((high - low) / 2);

    let test = 0;

    while(1 && test++ < 14) {
        console.log(test, ") limit : ", limit, " / low : ", low, "  high : ", high);
        if (low === high || (high - low) === 1) {
            break;
        }

        console.log(getSum(sortedBudgets, limit), " > ", M);
        const sum = getSum(sortedBudgets, limit);
        if (sum === M) {
            //high = limit;
            break;
        }
        else if (sum < M) {
            low = limit;
        }
        else {
            high = limit;
        }

        limit = low + Math.floor((high - low) / 2);
    }

    console.log("M ", M);
    console.log("sortedBudgets ", sortedBudgets);
    console.log("limit ", limit);

    console.log(" sum  :",getSum(sortedBudgets, limit));

    return limit;
}

function getSum(sortedBudgets, limit) {
    let sum = 0;
    for (let i = 0, len = sortedBudgets.length; i < len; i++) {
        if (sortedBudgets[i] > limit) {
            sum += limit * (len - i);
            break;
        }
        sum += sortedBudgets[i];
    }

    return sum;
}

function solution2(budgets, M) {
    let limit = 0;
    let length = budgets.length;

    let totalSum = budgets.reduce((acc, curr) => { return acc + curr });

    let totalSumAvg = Math.ceil(totalSum / length);
    let mAvg = Math.ceil(M / length);

    let startLimit = totalSumAvg < mAvg ? totalSumAvg : mAvg;
    let diffLimit = Math.abs(totalSumAvg - mAvg);
    console.log("value : ", budgets, M);

    for (let i = 0; i < diffLimit; i++) {
        limit = startLimit + i;

        let budgeSum = budgets.reduce((acc, curr) => {
            if (curr > limit) {
                return acc + limit;
            }
            else {
                return acc + curr;
            }
        })


        console.log(budgeSum, " > ", M);
        if (budgeSum > M) {
            limit -= 1;
            break;
        }
    }

    return limit;
}

function insightTool(budgets, M) {
    let answer = 0;
    let sortedBudgets = budgets.sort();
    let length = budgets.length;
    let limitValue = 0;

    while(1) {
        // get sum
        let sum = 0;
        console.log("limitValue : ", limitValue);
        for (let i = 0; i < length; i++) {
            console.log(sortedBudgets[i] > limitValue ? limitValue : sortedBudgets[i]);
            sum += sortedBudgets[i] > limitValue ? limitValue : sortedBudgets[i];
        }

        // find end value
        if (sum > M) {
            limitValue -= 1;
            break;
        }

        limitValue += 1;
    }

    answer = limitValue;

    return answer;
}

function generateValue() {
    const degree = 1000;        // origin : 1
    const count = Math.floor(Math.random() * (99996 / degree)) + 3;        // contry count
    const M = Math.floor(Math.random() * (1000000000 / degree)/degree) + count;   // total 
    let budges = [];
    while (1) {
        budges = [];
        for (let i = 0; i < count; i++) {
            budges.push(Math.floor(Math.random() * (100000 / degree)) + 1);
        }

        if (budges.reduce((acc, curr) => acc + curr) > M) {
            break;
        }
    }

    return [budges, M];
}

//insightTool([120, 110, 140, 150], 485);
//solution([120, 110, 140, 150], 485);

//solution(...generateValue());
solution([120, 110, 140, 150], 485);
//getSum([1,2,3,4,5,6,7,8,9,10], 5);