import { Feature, FeatureCollection } from "geojson";

export interface GeoJson extends FeatureCollection {
    type: "FeatureCollection";
    features: Feature[];
}

export interface Layer extends Feature {
    type: "Feature";
    properties: Properties;
    geometry: Geometry;
}

export interface Properties {
    NTAName: string;
    [key: string]: any;  
}

export interface Geometry {
    type: "Polygon";
    coordinates: number[][][];  
}

export interface TaxiZone {
    zoneId?: number,
    neighbourhood?: string,
    borough?: string,
    shapeLength?: number,
    shapeArea?: number,
    polygonCoords: string
}

