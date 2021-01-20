/**
 * author Juho Kettunen
 * 
 * Solves the most suitable link stations for certain points [x,y].
 * Prints output to the browser developer console.
 */

/** Points on a 2D-plane, consisting of coordinates x and y. */
type Point = [number, number];

/** Stations are located at points (x, y) and have reach (r).
 * Tuple components are arranged [x, y, r]. */
type Station = [number, number, number];

/**
 * Calculates the distance between points A and B.
 */
const distance = (a: Point, b: Point): number => {
    return Math.sqrt((a[0] - b[0])**2 + (a[1] - b[1])**2);
}

/**
 * Calculates the distance between a point and a station.
 */
const distanceToStation = (point: Point, station: Station): number => {
    const stationCoords: Point = getCoordinates(station);
    return distance(point, stationCoords);
}

/**
 * Returns coordinates from a tuple of type Station.
 */
const getCoordinates = (station: Station): Point => {
    return [station[0], station[1]];
}

/**
 * Calculates a link station's power towards a point.
 */
const calculatePower = (point: Point, station: Station): number => {
    const distance = distanceToStation(point, station);
    const reach = station[2];
    if (distance < reach) {
        return (reach - distance) ** 2;
    } else {
        return 0;
    }
}

/**
 * Returns the link station with most power for a given point.
 * Note: if this code was inline in printBestStations, we'd save 
 * one power calculation per point, because we'd have access to
 * the best power already calculated.
 */
const findBestStation = (point: Point, stations: Station[]): Station => {
    let bestStation = undefined;
    let bestPower = 0;
    for (let station of stations) {
        const power = calculatePower(point, station);  
        if (bestPower < power) {
            bestPower = power
            bestStation = station;
        };         
    }
    return bestStation;
}

/**
 * Finds the best link station for each point and prints out
 * the results.
 */
const printBestStations = (points: Point[], stations: Station[]) => {
    for (let point of points) {
        const bestStation = findBestStation(point, stations);
        if (bestStation) {
            const stationCoords = getCoordinates(bestStation);
            const power = calculatePower(point, bestStation);
            console.log(`Best link station for point ${point} is ${stationCoords} ` +
                        ` with power ${power.toFixed(2)}`);
        } else {
            console.log(`No link station within reach for point ${point}`)
        }
    }
}

const points: Point[] = [
    [0, 0],
    [100,100],
    [15,10],
    [18,18],
];

const stations: Station[] = [
    [0, 0, 10],
    [20, 20, 5],
    [10, 0, 12],
];

/** Main entry point for the program */
printBestStations(points, stations);