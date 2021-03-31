# german-to-american-gpa

Assumptions:

- the GPA is from 1 (worst) to 4 (best)
- we are rounding to the x,xx format, DONT trust this rounding if your life depends on it
- this table is correct for converting german grades to GPA: [TH-Nürnberg](https://www.th-nuernberg.de/fileadmin/fakultaeten/bw/ib_dokumente/1c._Anhang_3_Notenumrechnungstabelle.pdf)

Grades format:

```JSON
[
    [grade1, credit number1, "course name1" (optional)],
    [grade2, credit number2, "course name2" (optional)]... ]
```

How To:

- have Node.js installed (any newish version should work)
- put your grades into a grades.json in the same folder, make sure in the grade to use the american "." instead of the usual german ","
- run "node index.js"
