function loadHTML() {
    fetch('../public/navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        });

    fetch('../public/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadHTML();

    document.getElementById('generate-fixture').addEventListener('click', function() {
        const teamNames = document.getElementById('team-names').value.split(',').map(name => name.trim());
        const tournamentDuration = document.getElementById('tournament-duration').value;
        const startDate = new Date(document.getElementById('fixture-date').value);
        
        if (teamNames.length < 2) {
            alert("Please enter at least two teams.");
            return;
        }

        let fixture = `Football Fixture for a Tournament of ${tournamentDuration}:\n\n`;
        let matchDay = 1;

        for (let i = 0; i < teamNames.length; i += 2) {
            if (i + 1 < teamNames.length) {
                const matchDate = new Date(startDate);
                matchDate.setDate(startDate.getDate() + matchDay - 1);
                const matchDateString = matchDate.toISOString().split('T')[0];

                fixture += `${teamNames[i]} vs ${teamNames[i + 1]} on ${matchDateString} at 10:00 AM at Venue A\n`;
                matchDay++;
            }
        }

        document.getElementById('fixture-output').innerText = fixture;
    });
});
