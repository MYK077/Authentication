<% if(typeof errors != 'undefined') { %>
<%  errors.forEach(function(error){ %>
    <p><%= error.msg %></p>
<%  }) %>

<% } %>
