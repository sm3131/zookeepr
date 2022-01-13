const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');
test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Drake", id: "1234" },
        zookeepers
    );

    expect(zookeeper.name).toBe("Drake");
    expect(zookeeper.id).toBe("1234");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Drake",
            age: 26,
            favoriteAnimal: "bear",
        },
        {
            id: "4",
            name: "Noah",
            age: 39,
            favoriteAnimal: "gecko"
        },
    ];
    const updatedZookeepers = filterByQuery({ name: "Drake" }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Drake",
            age: 26,
            favoriteAnimal: "bear",
        },
        {
            id: "4",
            name: "Noah",
            age: 39,
            favoriteAnimal: "gecko"
        },
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Drake");
});

test("validates zookeeper age", () => {
    const zookeeper = {
        id: "3",
        name: "Drake",
        age: 26,
        favoriteAnimal: "bear",
    };

    const invalidZookeeper = {
        id: "3",
        name: "Drake",
        age: "26",
        favoriteAnimal: "bear",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});