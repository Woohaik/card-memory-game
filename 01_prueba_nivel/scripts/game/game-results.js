const tableContainer = document.querySelector(".result-container");

const lastScores = getScores();

const tableBase = (body) => `
<table>
    <thead>
        <tr>
            <th>
                PLACE
            </th>
            <th>
                Fails
            </th>
            <th>
                Time
            </th>
            <th>
                Name
            </th>
        </tr>  
    </thead>
    <tbody>
    ${body}
    </tbody>
</table>
`;


if (lastScores.length === 0) {
    tableContainer.innerHTML = "<h1>No scores yet!</h1>"
} else {
    const bodyContent = lastScores
        .sort((a, b) => a.time - b.time)
        .sort((a, b) => a.fails - b.fails)
        .map((scr, index) =>
            `<tr>
            <td>${index + 1}</td>
            <td>${scr.fails}</td>
            <td>${millSecsToSecString(scr.time)} s</td>
            <td>${scr.name}</td>
        </tr>
        `
        ).join("")
    tableContainer.innerHTML = tableBase(bodyContent)
}