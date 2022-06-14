fetch("http://localhost:3000/ramens").then(response => response.json()).then(json => renderRamen(json))
document.getElementById("new-ramen").addEventListener("submit", e => createNewRamen(e))
document.getElementById("delete-button").addEventListener("click", e => deleteRamen(e))
document.getElementById("edit-ramen").addEventListener("submit", e => updateRamen(e))

function renderRamen(json) {
    for (const ramen of json) {
        const div = document.createElement("div")
        const img = document.createElement("img")
        div.id = ramen.id
        img.src = ramen.image
        div.name = ramen.name
        div.restaurant = ramen.restaurant
        div.rating = ramen.rating
        div.comment = ramen.comment
        div.addEventListener("click", e => focusRamen(e))

        div.append(img)
        document.getElementById("ramen-menu").append(div)
    }
    document.querySelector("#ramen-menu div img").click()
}

function focusRamen(event) {
    const focusDiv = document.getElementById("ramen-detail")
    const ramenID = event.target.parentNode.id
    const imgSrc = event.target.src
    const name = event.target.parentNode.name
    const restaurant = event.target.parentNode.restaurant
    const rating = event.target.parentNode.rating
    const comment = event.target.parentNode.comment
    focusDiv.ramenID = ramenID



    focusDiv.querySelector("img").src = imgSrc
    focusDiv.querySelector("h2").innerText = name
    focusDiv.querySelector("h3").innerText = restaurant


    document.getElementById('rating-display').innerText = rating
    document.getElementById('comment-display').innerText = comment
}

function createNewRamen(event) {
    event.preventDefault()
    const name = document.getElementById("new-name").value
    const restaurant = document.getElementById("new-restaurant").value
    const image = document.getElementById("new-image").value
    const rating = document.getElementById("new-rating").value
    const comment = document.getElementById("new-comment").value

    const configurationObject = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({

            name: name,
            restaurant: restaurant,
            image: image,
            rating: rating,
            comment: comment

        })
    };
    fetch("http://localhost:3000/ramens", configurationObject).then(response => response.json()).then(json => renderRamen([json]))
}

function deleteRamen(e) {
    const ramenID = document.getElementById("ramen-detail").ramenID

    const configurationObject = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    };

    fetch(`http://localhost:3000/ramens/${ramenID}`, configurationObject).then(response => response.json()).then(json => removeRamenFromPage(ramenID))
}

function removeRamenFromPage(id) {
    document.getElementById(id).remove()
    document.querySelector("#ramen-menu div img").click()

}

function updateRamen(event) {
    event.preventDefault()
    const editForm = document.getElementById("edit-ramen")
    const newRating = editForm.querySelector("#new-rating").value
    const newComment = editForm.querySelector("#new-comment").value
    const ramenID = document.getElementById("ramen-detail").ramenID
    const configurationObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            rating: newRating,
            comment: newComment

        })
    };
    fetch(`http://localhost:3000/ramens/${ramenID}`, configurationObject).then(response => response.json()).then(json => updateRamenOnDom(newRating, newComment))

}

function updateRamenOnDom(newRating, newComment) {
    document.getElementById('rating-display').innerText = newRating
    document.getElementById('comment-display').innerText = newComment

}