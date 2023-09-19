'use strict';

const cardContainer = document.querySelector('.card-container');
const renderProducts = function (product) {
    const imageGeneration = product.variants.feature_image == null ? `<div class="w-300 h-300 p-20">image not found...</div>` : `<img class="w-300 h-300" src="${imageGeneration}" alt="${product.id}">`;
    const html = ` <div class="w-300 h-402 card mt-12">
        <div class="border-2 border-black">
            <div class="absolute m-3 p-2 text-white bg-black rounded text-xs">USED</div>
            ${imageGeneration}
        </div>
        <div class="pb-3 pt-3 flex flex-row">
            <div class="flex justify-between text-sm flex-col w-2/4">
                <span class="font-bold">${product.title}</span>
                <span class="font-bold">${product.variants[0].price} KR.</span>
            </div>
            <div class="flex text-sm flex-col w-2/4 text-end justify-start">
                <span class="font-medium">condition</span>
                <span>Slightly used</span>
            </div>
        </div>
        <button class="bg-black text-white rounded text-sm font-bold w-full p-4">PICK-UP IN <span class="underline">2200</span></button>
    </div>`;
    cardContainer.insertAdjacentHTML('afterbegin', html);
};

fetch('https://voodoo-sandbox.myshopify.com/products.json?limit=12')
.then(res => res.json())
.then(data => {
    const items = data.products;
    items.forEach(item => {
        console.log(item)
        renderProducts(item);
    });
})
.catch(error => console.error(error));