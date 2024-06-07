import { MultiPolygon, Position } from "../types/GeoJson";

const parseGeoJson = (geoJsonString: string): MultiPolygon => {

    const cleanedString = geoJsonString.replace(/^MULTIPOLYGON\s*\(\(\(/, '').replace(/\)\)\)$/, '');

    const polygons = cleanedString.split(')), ((');

    const multiPolygon: MultiPolygon = polygons.map(polygon => {
        // Split the polygon into positions
        const positions = polygon.split(', ').map(position => {
            // Split each position into longitude and latitude
            const [lng, lat] = position.split(' ').map(Number);
            return [lng, lat] as Position;
        });

        return positions;
    });
    return multiPolygon;
}

export default parseGeoJson