export default function apiConversion () {
    function freeOrNah (price) {
        if (price === null || price === undefined) return "N/A";
        if (price === 0) {
            return "Free!";
        } else {
            return "$" + Number(price).toFixed(2);
        }
    };

    function storeName (element) {
        switch (element) {
            case "1":
            return "Steam";
            case "2":
            "GamersGate";
            case "3":
            return "GreenManGaming";
            case "4":
            return "Amazon";
            case "5":
            return "GameStop";
            case "6":
            return "Direct2Drive";
            case "7":
            return "GOG";
            case "8":
            return "Origin";
            case "9":
            return "Get Games";
            case "10":
            return "Shiny Loot";
            case "11":
            return "Humble Store";
            case "12":
            return "Desura";
            case "13":
            return "Uplay";
            case "14":
            return "IndieGameStand";
            case "15":
            return "Fanatical";
            case "16":
            return "Gamesrocket";
            case "17":
            return "Games Republic";
            case "18":
            return "SilaGames";
            case "19":
            return "Playfield";
            case "20":
            return "ImperialGames";
            case "21":
            return "WinGameStore";
            case "22":
            return "FunStockDigital";
            case "23":
            return "GameBillet";
            case "24":
            return "Voidu";
            case "25":
            return "Epic Games Store";
            case "26":
            return "Razer Game Store";
            case "27":
            return "Gamesplanet";
            case "28":
            return "Gamesload";
            case "29":
            return "2Game";
            case "30":
            return "IndieGala";
            case "31":
            return "Blizzard Shop";
            case "32":
            return "AllYouPlay";
            case "33":
            return "DLGamer";
            case "34":
            return "Noctre";
            case "35":
            return "DreamGame";
        }
    };

    function dayConvert (day) {
        switch (day) {
            case 0:
            return "Sunday";
            case 1:
            return "Monday";
            case 2:
            return "Tuesday";
            case 3:
            return "Wednesday";
            case 4:
            return "Thursday";
            case 5:
            return "Friday";
            case 6:
            return "Saturday";
        }
    };

    function monthConvertName (month) {
        switch (month) {
            case 0:
            return "January";
            case 1:
            return "February";
            case 2:
            return "March";
            case 3:
            return "April";
            case 4:
            return "May";
            case 5:
            return "June";
            case 6:
            return "July";
            case 7:
            return "August";
            case 8:
            return "September";
            case 9:
            return "October";
            case 10:
            return "November";
            case 11:
            return "December";
        }
    }
    
    function timeConvert (milliseconds, mode) {
        if (milliseconds === 0) return "N/A";
        const unix_timestamp = Number(milliseconds * 1000);
        const conversion = new Date(unix_timestamp).toLocaleDateString("en-us", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });

        const currentDate = new Date();
        const timeDiff = Number(currentDate - conversion);

        switch (mode) {
            case "result":
                return conversion;
            case "difference":
                return timeDiff;
            default:
                return conversion;
        }
    };

    function discountPercentage (normal, discount) {
        if (!normal || !discount) return;
        
        const normalPrice = Number(normal);
        const discountPrice = Number(discount);

        const discountAmount = normalPrice - discountPrice;
        const divideFromOriginal = discountAmount / normalPrice;
        const convertToPercentage = divideFromOriginal * 100;

        return `${Math.floor(convertToPercentage)}%`
    }

    return {
        freeOrNah,
        storeName,
        dayConvert,
        monthConvertName,
        timeConvert,
        discountPercentage
    }
};