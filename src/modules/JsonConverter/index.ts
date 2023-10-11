import * as yaml from "js-yaml"; 
import * as papa from "papaparse";

const yamlSettings = {
    flowlevel: 3,
    styles: {
        '!!int' : 'hexadecimal', 
        '!!null': 'camelcase'
    }
}

function escapeSpecialChars(input: string): string {
    return input.replace(/\\n/g, "\\n")
                .replace(/\\'/g, "\\'")
                .replace(/\\"/g, '\\"')
                .replace(/\\&/g, "\\&")
                .replace(/\\r/g, "\\r")
                .replace(/\\t/g, "\\t")
                .replace(/\\b/g, "\\b")
                .replace(/\\f/g, "\\f");
}

export function jsonToYaml(jsonObject: string): string {
    try { 
        const jsonObject2 = JSON.parse(jsonObject);
        const yamlString = yaml.dump(jsonObject2, yamlSettings)
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
       
        const jsonString2 = escapeSpecialChars(jsonString)
        
        return jsonString;
    } catch (e) {
        console.log("Error converting YAML to JSON", e);
        return "There was an error"; 
        
    }
}

export function jsonToCsv(jsonObject: string): string {
    try {
        const jsonObject2 = JSON.parse(jsonObject);
        const csvObject = papa.unparse(jsonObject2);
        return csvObject; 
    } catch (e) {
        console.log("Error converting JSON to CSV", e); 
        return "there was an error";
    }
}

export function csvToJson(csvData: string): string {
    try {
        
        const jsonObject = papa.parse(csvData, {
            header: true,
            skipEmptyLines: true,
        });
        var jsonString = `${JSON.stringify(jsonObject, null, 2)}`;

        jsonString = escapeSpecialChars(jsonString);
        return jsonString; 
    } catch (e) {
        console.log("Error converting JSON to CSV", e); 
        return "there was an error";
    }
}

