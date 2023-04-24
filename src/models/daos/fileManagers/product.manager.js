import fs from "fs";
import path from "path";

class ProductFileManager {

    constructor(filename) {
        this.filePath = path.join(__dirname,`/files/${filename}`);
    }

    async getProducts() {
        if(fs.existsSync(this.filePath)){
            try{
                const contentFile = await fs.promises.readFile(this.filePath,'utf8');
                return JSON.parse(contentFile);
            }
            catch(error){
                throw new Error(`Couldn't read file ${error}`);
            }
        }
        else{
            throw new Error("File doesn't exists");
        }
    }

    async addProduct(obj) {
        try {
            const objects = await this.getProducts();
            let newId;
            if (objects.length === 0) {
                newId = 1;
            } else {
                newId = objects[objects.length - 1].id + 1;
            }
            const newObj = { id: newId, ...obj };
            objects.push(newObj);
            await fs.promises.writeFile(this.filePath, JSON.stringify(objects, null, 2))
            return newObj;
        } catch (error) {
            throw new Error(`Error saving: ${error}`);
        }
    }

    async getProductById(id) {
        const objects = await this.getProducts()
        const index = objects.findIndex(element=> element.id == id);
        if (index === -1) {
            throw new Error(`Error searching: Element with id: ${id} not found`);
        } else {
            const objectFound = objects[index];
            return objectFound;
        }
    }

    async updateById(info, id) {
        const objects = await this.getProducts()
        const index = objects.findIndex(element=> element.id == id)
        if (index == -1) {
            throw new Error(`Error updating: Element with id: ${id} not found`);
        } else {
            objects[index] = { id,...info }
            try {
                await fs.promises.writeFile(this.filePath, JSON.stringify(objects, null, 2))
                return objects[index];
            } catch (error) {
                throw new Error(`Error updating ${error}`);
            }
        }
    }

    async deleteById(id) {
        const objects = await this.getProducts();
        const index = objects.findIndex(element=> element.id == id);
        if (index == -1) {
            throw new Error(`Error: Element with id: ${id} not found`);
        }
        const object=objects[index];
        objects.splice(index, 1)
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify(objects, null, 2));
            return `Element with email: ${object.email} deleted successfully`;
        } catch (error) {
            throw new Error(`Error deleting: ${error}`);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify([]));
            return "delete all successfully";
        } catch (error) {
            throw new Error(`Error deleting: ${error}`);
        }
    }
}

export {ProductFileManager};