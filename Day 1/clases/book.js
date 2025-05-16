class Book {
    constructor (title, price) {
        this.title = title
        this.price = price
    }

    borrow () {
        console.log(`${this.title} is borrowed`);
        
    }

    static rent () {
        console.log("you need a book");
        
    }


}

class FictionBook extends Book {

}

const b1 = new Book("blouse", 200)

b1.borrow();