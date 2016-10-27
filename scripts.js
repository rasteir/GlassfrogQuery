
function getLLcode(json) {
  if (json != "Nothing found.") {
    var codeLL = '';
    for (i = 0; i < (json.roles.length); i++) {
      if (json.roles[i].name == "Lead Link") {
        codeLL = json.roles[i].links.people[0];
      }
    }
    return codeLL;
  }
}

function getLLmail(json, codeLL) {
  mailLL = "";
  if (codeLL == '') {
    return "Not Provided";
  }
  else {
    if (json == "Nothing found.") {
      var mailLL = "Not Provided";
    }
    else {
      for (i = 0; i < (json.linked.people.length); i++) {
        if (json.linked.people[i].id == codeLL) {
          mailLL = json.linked.people[i].email;
        }
      }
      return mailLL;
    }
  }
}

function getLLname(json, codeLL) {
  nameLL = "";
  if (codeLL == '') {
    return "Not Provided";
  }
  else {
    for (i = 0; i < (json.linked.people.length); i++) {
      if (json.linked.people[i].id == codeLL) {
        nameLL = json.linked.people[i].name;
      }
    }
  }
  return nameLL;
}


$(document).ready(function () {
  var getData = function (circle) {
    
    $.getJSON("request.php",{circle: circle},function (json) {
        if (json != "Nothing found.") {
          var circlename = json.linked.circles[0].name;
          var circleid = json.linked.circles[0].id;
          var codeLL = getLLcode(json);
          var nameLL = getLLname(json, codeLL);
          var mailLL = getLLmail(json, codeLL);
          var roleid;
          var rolename;
          var incircle;

          for (i = 0; i < (json.roles.length); i++) {
            if (json.roles[i].links.supporting_circle != null) {
              getData(json.roles[i].links.supporting_circle);
            }
            if (json.roles[i].links.people.length == 0) {
              $('#message').html("<h2 class='result'>Unassigned Roles List</h2>");
              roleid = json.roles[i].id;
              rolename = (json.roles[i].name).replace(/\s/g, '%20');
              rolename = rolename.replace('&', 'and');
              incircle = (json.linked.circles[0].name).replace(/\s/g, '%20');
              incircle = incircle.replace('&', 'and');
              $('#tabledata').append("<tr> <td><a href='https://app.glassfrog.com/circles/" + circleid + "' target='_blank'>" + circlename + "</a></td><td><a href='https://app.glassfrog.com/roles/" + roleid + "' target='_blank'>" + json.roles[i].name + "</a></td><td><a href=mailto:" + mailLL + "?subject=Interest%20on%20Role%20" + rolename + "%20in%20circle%20" + incircle + "&body=Hello,%20I'm%20interested%20to%20know%20more%20about%20this%20role,%20can%20we%20talk%20about%20it?>" + nameLL + "</a></td><td>" + json.roles[i].purpose + "</td></tr>");
            }
          }
        }
        else {
          $('#message').html('<h2 class="loading">No Data available</h2>');
        };
        return false;
      }
    );
  };
  $('#search').click(function () {
    var circle = $('#term').val();
    if (circle == '') {
      //BIO Circle by default
      circle = 7123;
    };
    getData(circle);
    $('#message').html("<h2 class='loading'>We are retrieving your data!</h2>");
    $('#tabledata').html("<thead><tr><th>Circle Name</th><th>Role Name</th><th>Lead Link to contact</th><th>Role Purpose</th></tr></thead><tbody></tbody>");
  });
  $('#term').keyup(function (event) {
    if (event.keyCode == 13) {
      var circle = $('#term').val();
      if (circle == '') {
        //BIO Circle by default
        circle = 7123;
      };
      getData(circle);
      $('#message').html("<h2 class='loading'>We are retrieving your data!</h2>");
      $('#tabledata').html("<thead><tr><th>Circle name</th><th>Role name</th><th>Lead Link to contact</th><th>Role Purpose</th></tr></thead><tbody></tbody>");
    }
  });
});
