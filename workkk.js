var players = []

function addPlayer(name, images, stats) {
    var player = {
        name: name,
        images: images,
        stats: stats,
        currentImageIndex: 0
    }
    players.push(player)
}

var LebronStats = {
    pointsPerGame: 27,
    assists: 7,
    rebounds: 7,
    currentTeam: "Los Angeles Lakers",
    position: "Forward",
    number: 6,
    height: "2,06 m",
    weight: "113 Kg",
    country: "USA",
    age: 39
}

var CurryStats = {
    pointsPerGame: 29,
    assists: 6,
    rebounds: 6,
    currentTeam: "Golden State Warriors",
    position: "Guard",
    number: 30,
    height: "1,88 m",
    weight: "84 Kg",
    country: "USA",
    age: 36
}
var KyrieStats = {
    pointsPerGame: 26,
    assists: 5,
    rebounds: 4,
    currentTeam: "Dallas Mavericks",
    position: "Guard",
    number: 2,
    height: "1.88 m",
    weight: "88 kg",
    country: "USA",
    age: 32
}


addPlayer("LeBron James",
    ["https://upload.wikimedia.org/wikipedia/commons/7/7a/LeBron_James_%2851959977144%29_%28cropped2%29.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3vbr6tpjrB5B4d6oLPmXKc79Lb-EuJixDFg&s",
        "https://assets.gqindia.com/photos/60fe74c619900248e3af9f2f/1:1/w_1080,h_1080,c_limit/Lebron-james-lifestyle.jpg"],
    LebronStats
)
addPlayer("Stephen Curry",
    ["https://hips.hearstapps.com/hmg-prod/images/stephen-curry-gettyimages-1398745379.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/2/27/Stephen_Curry_Shooting_%28cropped%29.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/f/f1/Steph_Curry_P20230117AS-1347_%28cropped%29.jpg"],
    CurryStats
)
addPlayer("Kyrie Irving",
    ["https://www.basketusa.com/wp-content/uploads/2024/03/irving-ramadan.jpg",
        "https://phantom-marca.unidadeditorial.es/cc0a7ac116a335cdaf505ccf772f36fe/resize/828/f/jpg/assets/multimedia/imagenes/2023/06/29/16880744134135.jpg",
        "https://img.buzzfeed.com/buzzfeed-static/complex/images/p1dugqrujp3ad1un51in/kyrie-irving-foot-locker-1.jpg?output-format=jpg&output-quality=auto"],
    KyrieStats
)



function each(array, func) {
    for (var i = 0; i < array.length; i++) {
        func(array[i], i)
    }
}
function map(array, f) {
    var acc = []
    each(array, function (element, i) {
        acc.push(f(element, i))
    })
    return acc
}
function filter(array, predicate) {
    var acc = []
    each(array, function (element) {
        if (predicate(element)) {
            acc.push(element)
        }
    })
    return acc
}


//Generate HTML to display a player's information, including an image, statistics, and a delete button.

function displayPlayer(player, index) {
    return `
        <div class="player-card" data-name="${player.name}">
            <img id="img-${index}" src="${player.images[player.currentImageIndex]}" alt="NBA Player" style="width:100%" 
            onclick="toggleImage(${index})">
            <div class="container">
                <h4><b>${player.name}</b></h4>
                <p>pointsPerGame: ${player.stats.pointsPerGame}</p>
                <p>assists: ${player.stats.assists}</p>
                <p>rebounds: ${player.stats.rebounds}</p>
                <p>currentTeam: ${player.stats.currentTeam}</p>
                <p>position: ${player.stats.position}</p>
                <p>number: ${player.stats.number}</p>
                <p>height: ${player.stats.height}</p>
                <p>weight: ${player.stats.weight}</p>
                <p>country: ${player.stats.country}</p>
                <p>age: ${player.stats.age}</p>
            </div>
            <button onclick="deletePlayer('${player.name}')">X</button>
        </div>
    `;
}

//Render all player cards to the web page by appending them to a container.
function displayPlayers(array) {
    const playersContainer = $('.players-container');
    playersContainer.html(''); // Clear the container
    for (let i = 0; i < array.length; i++) {
        playersContainer.append(displayPlayer(array[i], i));
    }
}

// Call displayPlayers to initially display all players
displayPlayers(players);

function deletePlayer(name) {
    players = players.filter(function (element) {
        return element.name !== name;
    });
    displayPlayers(players); // Re-display players after deleting
}

var imageIndex = 0;

function toggleImage(playerIndex) {
    console.log(imageIndex);
    // Update the imageIndex based on the playerIndex
    imageIndex = (imageIndex + 1) % players[playerIndex].images.length;
    // Update the src attribute of the image
    var img = "#img-" + playerIndex;
    $(img).attr("src", players[playerIndex].images[imageIndex]);
}




//this will allow me to show my new player when I submit his informations and his image url
$('#playerForm').submit(function(event) {
    event.preventDefault();
    
    var name = $('#playerName').val();
    //this .val() method allow me to get and bring back the current value of the specified element,
    // in this case the URL entered by the user.
    var image = $('#playerImage').val();
    var pointsPerGame = $('#pointsPerGame').val();
    var assists = $('#assists').val();
    var rebounds = $('#rebounds').val();
    var currentTeam = $('#currentTeam').val();
    var position = $('#position').val();
    var number = $('#number').val();
    var height = $('#height').val();
    var weight = $('#weight').val();
    var country = $('#country').val();
    var age = $('#age').val();

    var stats = {
        pointsPerGame: parseFloat(pointsPerGame),
        assists: parseFloat(assists),
        rebounds: parseFloat(rebounds),
        currentTeam: currentTeam,
        position: position,
        number: parseInt(number),
        height: height,
        weight: weight,
        country: country,
        age: parseInt(age)
    };

    addPlayer(name, [image], stats);
    displayPlayers(players);

    // Clear form, so after I submit all the inputs and the new player appears . all the inputs reset to clear
    $('#playerForm').trigger("reset");
});




//category- also whenever a new player added it will include him in categories based on the informations I provided for his scoring, tall ,and age
function filterByPointsPerGame() {
    var sortedPlayers = players.slice().sort((a, b) => b.stats.pointsPerGame - a.stats.pointsPerGame);
    displayPlayers(sortedPlayers);
}
//parseFloat converts a string that looks like a number into an actual number e.g ('6,2') becomes 6,2 a number. so this method ensures that we comparing as nums not texts
// Function to filter players by height
function filterByHeight() {
    var sortedPlayers = players.slice().sort((a, b) => parseFloat(b.stats.height) - parseFloat(a.stats.height));
    displayPlayers(sortedPlayers);
}

// Function to filter players by age
function filterByAge() {
    var sortedPlayers = players.slice().sort((a, b) => b.stats.age - a.stats.age);
    displayPlayers(sortedPlayers);
}

// Add event listeners to buttons to filter players
$('#mostScoringPlayers').click(filterByPointsPerGame);
$('#tallestPlayers').click(filterByHeight);
$('#oldestPlayers').click(filterByAge);