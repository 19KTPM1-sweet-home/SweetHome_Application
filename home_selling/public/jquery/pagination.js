$(window).on('load', function () {
const propertiesPerPage = 6;
const defaultTotalPages = 10;
const origin   = window.location.origin;
const pathname = window.location.pathname;
const slug = pathname.split("/").at(-1);
const url = origin + '/property/' + slug;
function loadPropertiesPerPage(currentPage) {
    const fullUrl = url +'/'+ currentPage.toString();
    console.log(fullUrl);
    $.get(fullUrl, function (data) {

        // temporary container 
        const container = $("<div class=\"row\"></div>");
        container.addClass('content')
        //load data to temporary container
        data.properties.forEach(function (properties, index, array) {

            let featureContainer = "<p class=\"card-text\">";
            properties.feature.forEach((feature) => {
                const templateFeatures = `
                                <ul>
                                    <li>${feature}</li>
                                </ul>
                    `;
                featureContainer +=templateFeatures;
            })
            featureContainer += "</p>";
            const template = `
                    <div class="col-lg-4 col-md-6 d-inline-flex">
                        <div class="card mt-4 w-100">
                            <a href="/detail/${properties.slug}">
                                <img src="${properties.previewImage}" class="card-img-top prev_image" alt="${this.name}" />
                            </a>
                            <div class="card-body" class="no-text-decoration">
                                <div class="d-flex justify-content-between">
                                    <a href="/detail/${properties.slug}" class="property-title">
                                        <h5 class="card-title ">${properties.name}</h5>
                                    </a>
                                    <h5 class="property-price ">$${properties.price}</h5>
                                </div>
                                ${featureContainer}
                            </div>
                            <div class="card-footer d-flex justify-content-between foot">
                                <a href="#" class="btn btn-primary">Liên hệ</a>
                            </div>
                        </div>
                    </div>
                `
            container.append(template);
            // Finish load all data of a page => render to layout
            if (index == array.length - 1) {
                $(".buying-section .content").replaceWith(container);
            }
        });
        $('.pagination-wrapper').pagination('updateItems',data.count)
    })
}
function initPagination() {
    $('.pagination-wrapper').pagination({
        items: defaultTotalPages,
        itemsOnPage: propertiesPerPage,
        onInit: loadPropertiesPerPage(1),
        onPageClick: function (currentPage) {
            $(this).removeAttr("href");
            loadPropertiesPerPage(currentPage);
        }
    })
}

//configure pagination
initPagination();
})