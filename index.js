const germanGradeRangesToGPAMap = new Map();
germanGradeRangesToGPAMap.set([1, 1.3], 4.0);
germanGradeRangesToGPAMap.set([1.3, 1.7], 3.7);
germanGradeRangesToGPAMap.set([1.7, 2], 3.3);
germanGradeRangesToGPAMap.set([2, 2.3], 3);
germanGradeRangesToGPAMap.set([2.3, 2.7], 2.7);
germanGradeRangesToGPAMap.set([2.7, 3], 2.3);
germanGradeRangesToGPAMap.set([3, 3.3], 2);
germanGradeRangesToGPAMap.set([3.3, 3.7], 1.7);
germanGradeRangesToGPAMap.set([3.7, 4], 1.3);
// this case is underspecified in the table
// usually worse than 4 means failed in germany
germanGradeRangesToGPAMap.set([4, 4.5], 1);

const germanGradeRanges = Array.from(germanGradeRangesToGPAMap.keys());

const isInGradeRange = (range, grade) => range[0] <= grade && grade < range[1];

const getGradeRange = (grade) => {
	return germanGradeRanges.find((range) => isInGradeRange(range, grade));
};

const getGPA = (grade) => germanGradeRangesToGPAMap.get(getGradeRange(grade));

const loadGradesJSON = () => JSON.parse(require("fs").readFileSync("./grades.json").toString());

const totalCreditAmount = (json) => json.reduce((p, c) => p + c[1], 0);

const addWeightedCourseGPAs = (json) =>
	json.reduce((p, c) => {
		const courseGPA = getGPA(c[0]);
		const courseDesc = c[2] ? c[2] : "Course";
		console.log(courseDesc + ": " + c[0] + " -> " + courseGPA);
		return p + courseGPA * c[1];
	}, 0);

const roundGPA = (gpa) => Math.round((gpa + Number.EPSILON) * 100) / 100;

const calculateGPA = () => {
	const json = loadGradesJSON();
	console.log("Total GPA: " + roundGPA(addWeightedCourseGPAs(json) / totalCreditAmount(json)));
};

calculateGPA();
