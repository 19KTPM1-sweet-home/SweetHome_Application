const searchBar = $('#search-bar');
const pathname = window.location.pathname;
const isSitePage = pathname.split("/").at(1)==='';
console.log(isSitePage);
searchBar.on('keyup', (event)=>{
  const searchString = event.target.value.toLowerCase();
  console.log(searchString);
  loadProperties(searchString);
})
const loadProperties = (queryString)=>{
  if(isSitePage){
    $.ajax({
      type: "POST",
      url: origin + '/search',
      contentType: "application/json",
      data: JSON.stringify({ queryString }),
      success: function(result){
        console.log(result);
        displaySite(result)
      }
    })
  }
  else{

  }
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
                            <a href="/detail/{{this.slug}}">
                                <img src="${property.previewImage}" class="card-img-top prev_image" alt="${property.name}" />
                            </a>
                            <div class="card-body" class="no-text-decoration">
                                <div class="d-flex justify-content-between">
                                    <a href="/detail/{{this.slug}}" class="property-title">
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