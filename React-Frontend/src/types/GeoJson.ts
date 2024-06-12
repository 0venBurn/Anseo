export interface Zone {
    type: string;
    geometry: Geometry;
    properties: Properties;
}
    
interface Geometry {
    type: string;
    coordinates: number[][][];
}

interface Properties {
    zip_code: number;
}