const searchBar = $('#search-bar');
const pathname = window.location.pathname;
const isSitePage = pathname.split("/").at(1)==='';
console.log(isSitePage);
searchBar.on('keyup', (event)=>{
  const searchString = event.target.value.toLowerCase();
  console.log(searchString);
  loadProperties()
    .then((properties)=>{
      if(isSitePage){
        let result;
        if(searchString === ''){
          result = properties.filter((property,index) =>{
            if(index<6){
              return property;
            }
          })
        }
        else{
          result = properties.filter((property)=>{
            return (property.name.toLowerCase().includes(searchString))||(property.address.toLowerCase().includes(searchString));
          })
        }
        if(result.length===0){
          displayNoResults($('#list-properties-container'));
        }
        else {
          displaySite(result)
        }

      }else{
          const result = properties.filter((property)=>{
          return (property.name.toLowerCase().includes(searchString))||(property.address.toLowerCase().includes(searchString));
        })
          if(result.length===0){
            displayNoResults($('#content .buying-section .content'))
          }
          else{
            // init pagination
            $('#property-pagination-wrapper').pagination(
              {
                dataSource:result,
                pageSize:propertiesPerPage,
                callback: function(data,pagination){
                  displayPropertyPerPage(data);
                }
              }
            )
          }
      }
    })
})
const loadProperties = ()=>{
  return new Promise((resolve, reject) => {
    let category = 'all';
    if(!isSitePage){
       category = pathname.split('/').at(-1);
    }
    filterProperties(category)
      .then((data)=>{
        resolve(data)
      })
  })
}
const displayNoResults = (container)=>{
  console.log(container);
  console.log('No results found');
  const no_results_container = $("<div class=\"row\"></div>");
  no_results_container.addClass('no-results-search');
  const no_results_content = $("<h2>No results found</h2>");
  const no_results_img_container = $("<div class=\"row\"></div>");
  no_results_img_container.addClass('no-results-img');
  const no_results_img = $("<img src=\"/images/no_result_found.svg\"></img>")
  no_results_img_container.append(no_results_img);
  no_results_container.append(no_results_content);
  no_results_container.append(no_results_img_container);
  container.html(no_results_container);
}
const filterProperties = (categoryFilter, keySearch =undefined, priceFilter = undefined, statusFilter=undefined, rateFilter =undefined)=>{
  return new Promise((resolve, reject) =>{
    $.ajax({
      type:"POST",
      url:origin + '/property/filter',
      contentType: "application/json",
      data: JSON.stringify({categoryFilter,keySearch,priceFilter,statusFilter,rateFilter}),
      success: function (res) {
        resolve(res);
      }
    })
  })

}
const displaySite =  (properties) =>{
  const container = $('#list-properties-container');
  console.log(container)
  const propertiesHtml = properties.map((property)=>{
    const featureHtml = property.feature.map((feature)=>{
      return `
    <ul>
        <li>${feature}</li>
    </ul>
    `
    })
    return `
                    <div class=" col-lg-4 col-md-6 d-inline-flex">
                        <div class="card mt-4 w-100">
                            <a href="/detail/${property.slug}">
                                <img src="${property.previewImage}" class="card-img-top prev_image" alt="${property.name}" />
                            </a>
                            <div class="card-body" class="no-text-decoration">
                                <div class="d-flex justify-content-between">
                                    <a href="/detail/${property.slug}" class="property-title">
                                    <h5 class="card-title ">${property.name}</h5>
                                    </a>
                                    <h5 class="property-price ">${property.price}</h5>
                                </div>

                                <p class="card-text">
                                ${featureHtml}
                                </p>
                            </div>
                            <div class = "card-footer d-flex justify-content-between foot">
                                <p><i class="far fa-clock"></i> ${property.time} ${property.unit} ago</p>
                                <a href="#" class="btn btn-primary">Liên hệ</a>
                            </div>
                        </div>
                    </div>
    `
  })
  container.html(propertiesHtml);
}

const displayPropertyPerPage = (data)=>{
  // temporary container
  const container = $("<div class=\"row\"></div>");
  container.addClass('content')
  //load data to temporary container
  data.forEach(function (properties, index, array) {

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
}






