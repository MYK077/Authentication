<% if(typeof errors != 'undefined') { %>
<%  errors.forEach(function(error){ %>
    <p><%= error.msg %></p>
<%  }) %>

<% } %>

<% if(typeof success_msg != 'undefined') { %>
    <p><%= success_msg %></p>
<%  } %>

<% if(typeof error_msg != 'undefined') { %>
    <p><%= error_msg %></p>
<%  } %>

<% if(typeof error!= 'undefined') { %>
    <p><%= error %></p>
<%  } %>
