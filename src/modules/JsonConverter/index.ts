import * as yaml from "js-yaml"; 


const yamlSettings = {
    flowlevel: 3,
    styles: {
        '!!int' : 'hexadecimal', 
        '!!null': 'camelcase'
    }
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
        console.log(jsonObject);
        
        
        return jsonObject;
    } catch (e) {
        console.log("Error converting YAML to JSON", e);
        return "There was an error"; 
        
    }
}

