export const SelectTravelList = [
    {
        "id": 1,
        "title": "Solo",
        "desc": "A solo traveller",
        "icon": "",
        "people": "1"
    },
    {
        "id": 2,
        "title": "Couple",
        "desc": "A romantic escape",
        "icon": "",
        "people": "2"
    },
    {
        "id": 3,
        "title": "Family Trip",
        "desc": "A family getaway",
        "icon": "",
        "people": "4-6"
    },
    {
        "id": 4,
        "title": "Freinds Vacation",
        "desc": "A fun-filled group trip",
        "icon": "",
        "people": "4-8"
    }
    // {
    //     "id": 4,
    //     "title": "business trip",
    //     "desc": "A corporate journey",
    //     "icon": "",
    //     "people": "2"
    // },

]

export const SelectBudgetOptions = [
    {
        "id": 1,
        "title": "Cheap",
        "desc": "Stay conscious of costs",
        "icon": "💵"
    },
    {
        "id": 2,
        "title": "Moderate",
        "desc": "A balance between comfort and price",
        "icon": "💰"
    },
    {
        "id": 3,
        "title": "Luxury",
        "desc": "Experience the best with no compromise",
        "icon": "🪙💰🪙"
    }

]


export const AI_PROMPT = 'Generate Travel Plan for Location : {location}, for {totalDays} days for {travellers} traveller with a budget of {budget} , give me Hotels options list with hotel name , hotel address, Price, Hotel image url, geo coordinate,rating, description, and suggest itinerary with placename,  Place detail, place image, url, Geo Coordinates, ticket pricing, Time to travel each of the location for {totalDays}  with each day plan with best time to visit in JSON format '