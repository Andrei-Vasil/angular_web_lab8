import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'lab8';
  async deleteBook(id: string) {
    var data_to_send = {
        "id": id
    }
    var response = await fetch("http://localhost/server/delete_book.php", { 
        method: 'DELETE',
        body: JSON.stringify(data_to_send)
    });
    if (response.status == 200) {
        alert("you have successfully deleted that record!");
        this.fillTableContents();
    }
    else {
        alert("something went wrong, try again!");
    }
  }
  
  async updateBook(id: string) {
    let actual_id: string = id.split("_")[0];
    let data_to_send: object = {
        "id": actual_id,
        "author": (document.getElementById(actual_id + "_author") as HTMLInputElement).value,
        "title": (document.getElementById(actual_id + "_title") as HTMLInputElement).value,
        "genre": (document.getElementById(actual_id + "_genre") as HTMLInputElement).value
    }
    var response = await fetch("http://localhost/server/update_book.php", { 
        method : "PUT", 
        body: JSON.stringify(data_to_send)
    });
    if (response.status != 200) {
        alert("something went wrong, try again!");
    }
  }
  
  async addBook() {
    console.log("you are truly in add book");
    var data_to_send = {
        "author": (document.getElementById("add_author") as HTMLInputElement).value,
        "title": (document.getElementById("add_title") as HTMLInputElement).value,
        "genre": (document.getElementById("add_genre") as HTMLInputElement).value
    }
    var response = await fetch("http://localhost/server/add_book.php", { 
        method : "POST", 
        body: JSON.stringify(data_to_send)
    });
    if (response.status == 200) {
        alert("you have successfully appended that record!");
        this.fillTableContents();
    }
    else {
        alert("something went wrong, try again!");
    }
  }
  
  deleteChildren(elementId: string) {
    let table: HTMLTableElement = document.getElementById(elementId) as HTMLTableElement;
    table.innerHTML = "";
  }
  
  createCell(parentRow: HTMLElement, val: string, id: string, isCRUD=true) {
    var tag = document.createElement("td");
    if (isCRUD) {
        let input_field: HTMLInputElement = document.createElement("input") as HTMLInputElement;
        input_field.value = val;
        input_field.id = id;
        input_field.onkeyup = () => {
            this.updateBook(id);
        };
        tag.appendChild(input_field);
    }
    else {
        let text = document.createTextNode(val);
        tag.appendChild(text);
    }
    parentRow.appendChild(tag);
  }
  
  createButton(parentRow: HTMLElement, btnText: string, fnc: any) {
    var tag = document.createElement("td");
    
    var btn = document.createElement("button");
    btn.onclick = fnc;
    
    var text = document.createTextNode(btnText);
    
    btn.appendChild(text);
    tag.appendChild(btn);
  
    parentRow.appendChild(tag);
  }
  
  createRow(val: any, elementId: string, isCRUD=true) {
    let table: HTMLTableElement = document.getElementById(elementId) as HTMLTableElement;
    let row = document.createElement("tr");
    
    this.createCell(row, val.author, val.id + "_author", isCRUD);
    this.createCell(row, val.title, val.id + "_title", isCRUD);
    this.createCell(row, val.genre, val.id + "_genre", isCRUD);
    if (isCRUD) {
        this.createButton(row, "Delete", () => { 
            this.deleteBook(val.id); 
        });
    }
  
    table.appendChild(row);
  }
  
  async fillTableContents(isCRUD=true, getFiltered=false) {
    var data;
    if (getFiltered) {
        data = await this.getFilteredBooks();
    }
    else {
        data = await this.getAllBooks();
    }
    this.deleteChildren("tableContents");
    for (var i = 0; i < data.length; i++) {
        this.createRow(data[i], "tableContents", isCRUD);
    }
  }
  
  async getFilteredBooks() {
    const genre = (document.getElementById("genre") as HTMLInputElement).value;
    var response = await fetch("http://localhost/server/get_all_filtered_by_genre.php?genre=" + genre);
    if (response.status != 200) {
        alert("something went wrong, could not fetch books!");
    }
    var data = await response.json();
    return data;
  }
  
  async getAllBooks() {
    var response = await fetch("http://localhost/server/get_all_books.php");
    console.log("sup bro");
    if (response.status != 200) {
        alert("something went wrong, could not fetch books!");
    }
    var data = await response.json();
    return data;
  }
}
