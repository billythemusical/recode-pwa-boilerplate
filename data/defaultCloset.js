const defaultCloset = [
  
        {
            name: "beanie",
            category: "hat",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/beanie.png?v=1642731833951"
        },
        {
            name: "body",
            category: "none",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/body.png?v=1642731834063"
        },
        {
            name: "jacket",
            category: "top",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/jacket.png?v=1642731834040"
        },
        {
            name: "jeans",
            category: "bottom",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/jeans.png?v=1642731834628"
        },
        {
            name: "parka",
            category: "top",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/parka.png?v=1642731834675"
        },
        {
            name: "shorts",
            category: "bottom",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/shorts.png?v=1642731834200"
        },
        {
            name: "snow-pants",
            category: "bottom",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/snow-pants.png?v=1642731834707"
        },
        {
            name: "sunglasses",
            category: "accessory",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/sunglasses.png?v=1642731834851"
        },
        {
            name: "tank-top",
            category: "top",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/tank-top.png?v=1642731834978"
        },
        {
            name: "tshirt",
            category: "top",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/tshirt.png?v=1642731835589"
        },
        {
            name: "umbrella",
            category: "accessory",
            default_set: ["male", "female", "non"],
            temp_range: {hi: 0, lo: 0},
            priority: 1,
            img: "https://cdn.glitch.global/03796fc2-c550-441d-9435-01df882dc421/umbrella.png?v=1642731835865"
        }
    ];


const newClothing = {
    name: "",
    category: "",
    temp_range: { hi: 0, lo: 0 },
    priority: 1,
    img: "",
}

module.exports = {
  defaultCloset,
  newClothing
}