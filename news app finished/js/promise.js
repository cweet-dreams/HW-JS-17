class Http {
    constructor() {
        this.http = new XMLHttpRequest();
    }

    get(url) {
        const self = this; // сохранить контекст вызова
        return new Promise((resolve, reject) => {
            this.http.open("GET", url);

            this.http.addEventListener("load", function () {
                if (self.http.status === 200) {
                    resolve({
                        error: null,
                        response: self.http.responseText
                    }); // вызываем callback после ответа сервера
                } else {

                    reject({
                        error: `Error: ${self.http.status}`,
                        response: null
                    });
                }
            });

            this.http.send();
        });
    }
}