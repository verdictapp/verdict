import moment from "moment";

// Fake Data
// var data = {
//   "0": {
//     "21/1/2024": 5,
//     "24/1/2024": 1,
//     "26/2/2024": 2,
//     "28/2/2024": 2,
//     "1/3/2024": 2,
//     "2/3/2024": 2,
//     "4/3/2024": 2,
//     "5/3/2024": 2,
//     "5/4/2024": 5,
//     "6/4/2024": 2,
//   },
//   "1": { "23/1/2024": 4, "24/1/2024": 1, "25/1/2024": 1, "27/2/2024": 1 },
// };

export default function timedStatsConverter(timedStats) {
  // Fake Data Testing
  // let [min, max] = minMax(data);
  // return walk(min, max, data);
  let [min, max] = minMax(timedStats);
  return walk(min, max, timedStats);
}

/**
 * finds the min and max dates. Assumes the dates are sorted.
 * @param dateList
 * @returns array of [min, max] values as a moment instance
 */
function minMax(dateList: any) {
  let options = Object.keys(dateList);
  let min, max;

  for (let optionKey in options) {
    let dates = Object.keys(dateList[optionKey]);

    let first = parseDate(dates[0]);
    let last = parseDate(dates[dates.length - 1]);

    if (!min || first.isBefore(min)) {
      min = first;
    }

    if (!max || last.isAfter(max)) {
      max = last;
    }
  }

  return [min, max];
}

function parseDate(date) {
  return moment(date, "DD/MM/yyyy", false);
}

function formatDate(date: moment.Moment, withDay: boolean = true) {
  return date.format(withDay ? "D/M/yyyy" : "M/yyyy");
}

/**
 *
 * @param min
 * @param max
 * @param dateList
 */
function walk(min: moment.Moment, max: moment.Moment, dateList) {
  let recommendedTimeSlicing = "daily";
  let numOfDays = Math.abs(min.diff(max, "days"));
  if (numOfDays > 62) {
    recommendedTimeSlicing = "monthly";
  } else if (numOfDays > 30) {
    recommendedTimeSlicing = "weekly";
  }

  let data = [];
  let monthlyData = [];
  let weeklyData = [];
  let currentMonth = moment(min);
  let currentWeek = moment(min);
  // accumulate counter
  let values = new Array(Object.keys(dateList).length).fill(0);

  let notFinished = true;
  while (notFinished) {
    for (let i = 0; i < values.length; i++) {
      values[i] += dateList[i][formatDate(min)] || 0;
    }

    data.push({
      name: formatDate(min),
      ...values,
    });

    if (min.isSame(max)) {
      notFinished = false;

      // add last monthly accumulation
      monthlyData.push({
        name: formatDate(currentMonth, false),
        ...values,
      });

      weeklyData.push({
        name: "W" + currentWeek.week() + "|" + currentWeek.year(),
        ...values,
      });
    } else {
      min.add(1, "day");

      if (!currentMonth.isSame(min, "M")) {
        monthlyData.push({
          name: formatDate(currentMonth, false),
          ...values,
        });
        currentMonth = moment(min);
      }

      if (!currentWeek.isSame(min, "week")) {
        weeklyData.push({
          name: "W" + currentWeek.week() + " " + currentWeek.year(),
          ...values,
        });
        currentWeek = moment(min);
      }
    }
  }
  return { data, monthlyData, weeklyData, recommendedTimeSlicing };
}
