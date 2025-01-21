import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMENI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "Here is an article about exciting things to do in New York City. Convert this into a structured format with 3 columns - activity, best season to partake in this activity, and amount of time needed.\n\nNew York City vibrates with an irresistible energy that never sleeps, offering an abundance of experiences for every traveler! In the pleasant embrace of spring or the colorful tapestry of fall, dedicate a half or even a full day to exploring the sprawling expanse of Central Park. Take a leisurely bike ride, enjoy a picnic lunch, or rent a boat on the lake – the possibilities for enjoyment are endless! Regardless of the season, art enthusiasts can immerse themselves in the vast collection of the Metropolitan Museum of Art, dedicating an afternoon to wander through centuries of human creativity.\n\nFor a dose of captivating entertainment, catch a world-renowned Broadway show, a three-hour journey into the heart of theater and music. Spring or fall offers the ideal weather for a ferry ride to the Statue of Liberty and Ellis Island, allowing for a half or full day to delve into the stories of immigration and freedom that shaped America. When the weather beckons you outdoors in the summer months, dedicate an hour to a stroll along the High Line, a unique elevated park offering breathtaking city views and urban gardens.\n\nAs dusk settles, head to the dazzling spectacle of Times Square, spending thirty minutes to an hour soaking in the vibrant lights and bustling energy. For a moment of reflection, visit the poignant 9/11 Memorial & Museum, dedicating two to three hours to honor the lives lost and the unwavering spirit of the city. From the trendy streets of Soho to the historic charm of Greenwich Village, exploring the diverse neighborhoods of New York City is an adventure in itself, with the time commitment varying based on your chosen area and interests. And for those seeking a taste of the city's vibrant culture, a two-hour hour food tour will tantalize your taste buds with diverse flavors and culinary delights.\n\nNo matter your interests or the time of year, New York City promises an unforgettable experience, brimming with iconic sights, captivating performances, and endless opportunities for exploration!",
                },
            ],
        },
        {
            role: "model",
            parts: [
                {
                    text: "Okay, here's the article content converted into a structured table format with the requested columns:\n\n| Activity                     | Best Season(s)    | Amount of Time Needed |\n|------------------------------|--------------------|-----------------------|\n| Exploring Central Park       | Spring, Fall       | Half to Full Day      |\n| Metropolitan Museum of Art   | Any                | Afternoon             |\n| Broadway Show                | Any                | 3 Hours               |\n| Statue of Liberty & Ellis Island Ferry | Spring, Fall       | Half to Full Day      |\n| Stroll Along the High Line   | Summer             | 1 Hour                |\n| Times Square Visit           | Any                | 30 minutes - 1 Hour     |\n| 9/11 Memorial & Museum       | Any                | 2 - 3 Hours           |\n| Exploring NYC Neighborhoods   | Any                | Varies                |\n| Food Tour                    | Any                | 2 Hours               |\n",
                },
            ],
        },
    ],
});


