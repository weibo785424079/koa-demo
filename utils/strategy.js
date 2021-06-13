/**
 * 规则
 * 加仓
 * 1，如果今天跌幅超过3%，并且三天内跌幅超过5%，10
 * 2，今天跌幅超过2%，并且昨天跌幅超过2%，9
 * 3, 如果今天跌幅超1，并且最近三天均为负，且累加超过4%
 *
 * 减仓
 * 1，今天涨幅超过3%，并且昨天涨幅超过2% 10
 * 2，今天涨幅超过3%，最近一周涨幅超过7% 9
 */

const addStrategys = {
    strategy1: (fund) => {
        if (+fund.expectGrowth <= -3) {
            const netWorthData = [...fund.netWorthData];
            const last = netWorthData.pop();
            const beforeLast = netWorthData.pop();
            const beforeBeforeLast = netWorthData.pop();
            if (+last[2] <= 3 && (+last[2] + +beforeLast[2] + +beforeBeforeLast[2] <= -5)) {
                return {
                    name: fund.name,
                    code: fund.code,
                    msg: '建议加仓',
                    operation: 'add',
                    desc: `今日预计跌幅${fund.expectGrowth}%,三天内跌幅超5%，建议加仓`,
                };
            }
        }
        return undefined;
    },
    strategy2: (fund) => {
        if (+fund.expectGrowth <= -2) {
            const netWorthData = [...fund.netWorthData];
            const lastGrowth = +netWorthData.pop()[2];
            const beforeLastGrowth = +netWorthData.pop()[2];
            if (lastGrowth <= -2 && (lastGrowth + beforeLastGrowth <= -4)) {
                return {
                    name: fund.name,
                    code: fund.code,
                    msg: '建议加仓',
                    operation: 'add',
                    desc: `今日预计跌幅${fund.expectGrowth}%,昨今两天跌幅超4%，建议加仓`,
                };
            }
        }
        return undefined;
    },
    strategy3: (fund) => {
        if (+fund.expectGrowth <= -1) {
            const netWorthData = [...fund.netWorthData];
            const lastGrowth = +netWorthData.pop()[2];
            const beforeLastGrowth = +netWorthData.pop()[2];
            const beforeBeforeLastGrowth = +netWorthData.pop()[2];
            if (lastGrowth <= -2 && (beforeLastGrowth < 0 || beforeBeforeLastGrowth < 0) && (lastGrowth + beforeLastGrowth + beforeBeforeLastGrowth <= -4)) {
                return {
                    name: fund.name,
                    code: fund.code,
                    msg: '建议加仓',
                    operation: 'add',
                    desc: `今日预计跌幅${fund.expectGrowth}%,近三天总跌幅超4%，建议加仓`,
                };
            }
        }
        return undefined;
    },
    strategy4: (fund) => {
        if (+fund.expectGrowth <= -3) {
            return {
                name: fund.name,
                code: fund.code,
                msg: '建议加仓',
                operation: 'add',
                desc: `触发加仓规则4，今日预计跌幅${fund.expectGrowth}%, 跌幅超3%，建议小幅度加仓`,
            };
        }
        return undefined;
    },
};

const reduceStrategys = {
    strategy1: (fund) => {
        if (+fund.expectGrowth >= 3) {
            const netWorthData = [...fund.netWorthData];
            const lastGrowth = +netWorthData.pop()[2];
            const beforeLastGrowth = +netWorthData.pop()[2];
            if (lastGrowth + beforeLastGrowth >= 5) {
                return {
                    name: fund.name,
                    code: fund.code,
                    msg: '建议减仓',
                    operation: 'cut-down',
                    desc: `触发减仓策略1:今日预计涨幅${fund.expectGrowth}%,今昨两天涨幅超5%，建议减仓`,
                };
            }
        }
        return undefined;
    },
    strategy2: (fund) => {
        if (+fund.expectGrowth >= 4) {
            const netWorthData = [...fund.netWorthData];
            const lastGrowth = +netWorthData.pop()[2];
            const beforeLastGrowth = +netWorthData.pop()[2];
            const beforeBeforeLastGrowth = +netWorthData.pop()[2];
            if (lastGrowth + beforeLastGrowth + beforeBeforeLastGrowth > 5) {
                return {
                    name: fund.name,
                    code: fund.code,
                    msg: '建议减仓',
                    operation: 'cut-down',
                    desc: `触发减仓策略2:今日预计涨幅${fund.expectGrowth}%,今三天总涨幅超5%，建议减仓`,
                };
            }
        }
        return undefined;
    },
};
const some = (...fns) => (fund) => {
    return fns.reduce((res, fn) => {
        return res || fn(fund);
    }, null);
};

const addSome = some(
    addStrategys.strategy1, 
    addStrategys.strategy2, 
    addStrategys.strategy3, 
    addStrategys.strategy4,
    reduceStrategys.strategy1,
    reduceStrategys.strategy2
);

const getOperation = (fund) => {
    const res = addSome(fund);
    if (res) return res;
    return {
        operation: 'lie-down',
        msg: '建议卧倒',
        name: fund.name,
        code: fund.code,
    };
};

module.exports = getOperation;
