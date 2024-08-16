document.addEventListener('DOMContentLoaded', function() {
    const players = [
        { name: 'Alex', position: 'Point Guard', age: 17 },
        { name: 'Jordan', position: 'Shooting Guard', age: 18 },
        { name: 'Mike', position: 'Small Forward', age: 17 },
        // Add more players as needed
    ];

    const playerList = document.getElementById('playerList');
    const toggleButton = document.getElementById('toggleDetails');

    let showDetails = false;

    function renderPlayers() {
        playerList.innerHTML = ''; // Clear the list
        players.forEach(player => {
            const listItem = document.createElement('li');
            listItem.textContent = `${player.name} (${player.position})`;
            if (showDetails) {
                listItem.textContent += ` - Age: ${player.age}`;
            }
            playerList.appendChild(listItem);
        });
    }

    toggleButton.addEventListener('click', () => {
        showDetails = !showDetails; // Toggle the state
        renderPlayers(); // Re-render the list with the new state
    });

    renderPlayers(); // Initial render
});