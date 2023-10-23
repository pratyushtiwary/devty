import * as yaml from "js-yaml"; 
import * as papa from "papaparse";

const yamlSettings = {
    flowlevel: 3,
    styles: {
        '!!int' : 'hexadecimal', 
        '!!null': 'camelcase'
    }
}

export function jsonToYaml(jsonString: string): string {
    try { 
        const jsonObject = JSON.parse(jsonString);
        const yamlString = yaml.dump(jsonObject, yamlSettings)
        return yamlString;
    } catch (e) {
        console.log("Error converting JSON to YAML", e);
        return "There was an error"; 
    }
}

export function yamlToJson(yamlObject: any): string {
    try { 
        const jsonObject = yaml.load(yamlObject);
        const jsonString = `${JSON.stringify(jsonObject, null, 2)}`
        return jsonString;
    } catch (e) {
        console.log("Error converting YAML to JSON", e);
        return "There was an error"; 
    }
}

export function jsonToCsv(jsonString: string): string {
    try {
        const jsonObject = JSON.parse(jsonString);
        const csvObject = papa.unparse(jsonObject);
        return csvObject; 
    } catch (e) {
        console.log("Error converting JSON to CSV", e); 
        return "There was an error";
    }
}

export function csvToJson(csvData: any): string {
    try {
        
        const jsonObject = papa.parse(csvData, {
            header: false,
            skipEmptyLines: true,
        });
        
        const cleanJsonObject = jsonObject.data;
        var jsonString = `${JSON.stringify(cleanJsonObject, null, 2)}`;
        return jsonString; 
    } catch (e) {
        console.log("Error converting CSV to JSON", e); 
        return "There was an error";
    }
}

