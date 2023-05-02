export const category = [
    {id:1,name:'Food',imageurl:require('../assets/Category/Food.png') ,color:'#FF69B4',img:'../assets/Category/Food.png',},
    {id:2,name:'Clothing',imageurl:require('../assets/Category/Clothing.png') ,color:'#C71585',img:'../assets/Category/Clothing.png',},
    {id:3,name:'Fruits',imageurl:require('../assets/Category/Fruits.png') ,color:'#8A2BE2',img:'../assets/Category/Fruits.png',},
    {id:4,name:'Shopping',imageurl:require('../assets/Category/Shopping.png') ,color:'#8B008B',img:'../assets/Category/Shopping.png',},
    {id:5,name:'Transport',imageurl:require('../assets/Category/Transportation.png') ,color:'#4B0082',img:'../assets/Category/Transportation.png',},
    {id:6,name:'Home',imageurl:require('../assets/Category/Home.png') ,color:'#FF0000',img:'../assets/Category/Home.png',},
    {id:7,name:'Travel',imageurl:require('../assets/Category/Travel.png') ,color:'#FFA07A',img:'../assets/Category/Travel.png',},
    {id:8,name:'Wine',imageurl:require('../assets/Category/Wine.png') ,color:'#DC143C',img:'../assets/Category/Wine.png',},
    {id:9,name:'Gift',imageurl:require('../assets/Category/Gift.png') ,color:'#FFA500',img:'../assets/Category/Gift.png',},
    {id:10,name:'Education',imageurl:require('../assets/Category/Education.png') ,color:'#FF4500',img:'../assets/Category/Education.png',},
    {id:11,name:'Snacks',imageurl:require('../assets/Category/Snacks.png') ,color:'#FFFF00',img:'../assets/Category/Snacks.png',},
    {id:12,name:'Telephone',imageurl:require('../assets/Category/Telephone.png') ,color:'#ADFF2F',img:'../assets/Category/Telephone.png',},
    {id:13,name:'Baby',imageurl:require('../assets/Category/Baby.png') ,color:'#32CD32',img:'../assets/Category/Baby.png',},
    {id:14,name:'Sport',imageurl:require('../assets/Category/Sport.png') ,color:'#00FA9A',img:'../assets/Category/Sport.png',},
    {id:15,name:'Tax',imageurl:require('../assets/Category/TaX.png') ,color:'#006400',img:'../assets/Category/TaX.png',},
    {id:16,name:'Electronics',imageurl:require('../assets/Category/Electronics.png') ,color:'#20B2AA',img:' ',},
    {id:17,name:'Health',imageurl:require('../assets/Category/Health.png') ,color:'#008080',img:'../assets/Category/Health.png',},
    {id:18,name:'Enjoyment',imageurl:require('../assets/Category/Entertainment.png') ,color:'#0000FF',img:'../assets/Category/Entertainment.png',},
    {id:19,name:'Car',imageurl:require('../assets/Category/Car.png') ,color:'#00BFFF',img:'../assets/Category/Car.png',},
    {id:20,name:'Social',imageurl:require('../assets/Category/Social.png') ,color:'#F4A460',img:'../assets/Category/Social.png',},
    {id:21,name:'Insurance',imageurl:require('../assets/Category/Insurance.png') ,color:'#DAA520',img:'../assets/Category/Insurance.png',},
    {id:22,name:'Office',imageurl:require('../assets/Category/Office.png') ,color:'#800000',img:'../assets/Category/Office.png',},
    {id:23,name:'Cigarette',imageurl:require('../assets/Category/Cigarette.png') ,color:'#000000',img:'../assets/Category/Cigarette.png',},
    {id:24,name:'Pet',imageurl:require('../assets/Category/Pet.png') ,color:'#778899',img:'../assets/Category/Pet.png',},
    {id:25,name:'Beauty',imageurl:require('../assets/Category/Beauty.png') ,color:'#696969',img:'../assets/Category/Beauty.png',},
    {id:26,name:'Bills',imageurl:require('../assets/Category/Bills.png') ,color:'#808000',img:'../assets/Category/Bills.png',},
]

export const incomecategory = [
    {id:27,name:'Rental',imageurl:require('../assets/Category/Rental.png') ,color:'#008080',img:'../assets/Category/Rental.png',},
    {id:28,name:'Grants',imageurl:require('../assets/Category/Grants.png') ,color:'#FFA500',img:'../assets/Category/Grants.png',},
    {id:29,name:'Dividends',imageurl:require('../assets/Category/Dividends.png') ,color:'#8A2BE2',img:'../assets/Category/Dividends.png',},
]


export const categoriesData = [
    {
        id: 1,
        name: "Education",
        expenses: [
            {
                id: 1,
                title: "Tuition Fee",
                description: "Tuition fee",
                location: "ByProgrammers' tuition center",
                total: 100.00,
            },
            {
                id: 2,
                title: "Arduino",
                description: "Hardward",
                location: "ByProgrammers' tuition center",
                total: 30.00,
            },
            {
                id: 3,
                title: "Javascript Books",
                description: "Javascript books",
                location: "ByProgrammers' Book Store",
                total: 20.00,
            },
            {
                id: 4,
                title: "PHP Books",
                description: "PHP books",
                location: "ByProgrammers' Book Store",
                total: 20.00,
            }
        ],
    },
    {
        id: 2,
        name: "Nutrition",
        expenses: [
            {
                id: 5,
                title: "Vitamins",
                description: "Vitamin",
                location: "ByProgrammers' Pharmacy",
                total: 25.00,
            },

            {
                id: 6,
                title: "Protein powder",
                description: "Protein",
                location: "ByProgrammers' Pharmacy",
                total: 50.00,
            },

        ],
    },
    {
        id: 3,
        name: "Child",
        expenses: [
            {
                id: 7,
                title: "Toys",
                description: "toys",
                location: "ByProgrammers' Toy Store",
                total: 25.00,
            },
            {
                id: 8,
                title: "Baby Car Seat",
                description: "Baby Car Seat",
                location: "ByProgrammers' Baby Care Store",
                total: 100.00,
            },
            {
                id: 9,
                title: "Pampers",
                description: "Pampers",
                location: "ByProgrammers' Supermarket",
                total: 100.00,
            },
            {
                id: 10,
                title: "Baby T-Shirt",
                description: "T-Shirt",
                location: "ByProgrammers' Fashion Store",
                total: 20.00,
            },
        ],
    },
    {
        id: 4,
        name: "Beauty & Care",
        expenses: [
            {
                id: 11,
                title: "Skin Care product",
                description: "skin care",
                location: "ByProgrammers' Pharmacy",
                total: 10.00,
            },
            {
                id: 12,
                title: "Lotion",
                description: "Lotion",
                location: "ByProgrammers' Pharmacy",
                total: 50.00,
            },
            {
                id: 13,
                title: "Face Mask",
                description: "Face Mask",
                location: "ByProgrammers' Pharmacy",
                total: 50.00,
            },
            {
                id: 14,
                title: "Sunscreen cream",
                description: "Sunscreen cream",
                location: "ByProgrammers' Pharmacy",
                total: 50.00,
            },
        ],
    },
    {
        id: 5,
        name: "Sports",
        expenses: [
            {
                id: 15,
                title: "Gym Membership",
                description: "Monthly Fee",
                location: "ByProgrammers' Gym",
                total: 45.00,
            },
            {
                id: 16,
                title: "Gloves",
                description: "Gym Equipment",
                location: "ByProgrammers' Gym",
                total: 15.00,
            },
        ],
    },
    {
        id: 6,
        name: "Clothing",
        expenses: [
            {
                id: 17,
                title: "T-Shirt",
                description: "Plain Color T-Shirt",
                location: "ByProgrammers' Mall",
                total: 20.00,
            },
            {
                id: 18,
                title: "Jeans",
                description: "Blue Jeans",
                location: "ByProgrammers' Mall",
                total: 50.00,
            },
        ],
    }
]