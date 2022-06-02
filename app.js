var expense =[]
$(document).ready(function(){
    $("#update").hide();
    displaytable();
    //  ==================== Adding  =============
    $("#add").click(function(){
        var category = $("#category").val();
        var details = $("#dis").val();
        var date = $("#date").val();
        var amount = $("#amount").val();
        console.log( category +" ,"+ details+", "+date+" ,"+amount)
       
        var data= {
            category : category, 
            dis: details,
            date:date,
            amount:amount,
        }
        expense.push(data)
        displaytable();

    });

    $(document).on('click', '.edit', function(){
        var id = this.id;
        // console.log(id);
        var date = $("#row_"+id).children().first().html();
        console.log(date);
        var dis = $("#row_"+id).children().eq(2).html();
        console.log(dis);
        var category = $("#row_"+id).children().eq(1).html();
        console.log(category);
        var amount = $("#row_"+id).children().eq(3).html();
        console.log(amount);

        $("#category").val(category);
        $("#dis").val(dis);
        $("#date").val(date);
        $("#amount").val(amount);
        $("#id").val(id)
        $("#add").hide();
        $("#update").show();
    })
    
    //  ==================== updating =============
    $("#update").click(function(){
        var category = $("#category").val();
        var details = $("#dis").val();
        var date = $("#date").val();
        var amount = $("#amount").val();
        var id = $("#id").val();
        console.log( category +" ,"+ details+", "+date+" ,"+amount);
            data = {
                category : category, 
                dis: details,
                date:date,
                amount:amount,
                action:"update",
            } ;
        expense[id] = data;
        $("#add").show();
        $("#update").hide();
        displaytable();
    })
    //  ==================== removing =============
    $(document).on('click', '.del', function(){
        var x = this.id;
        var id = x.split("_")[1]; 
        console.log(id);
        expense.splice(id,1)
        displaytable();
    });
    //  ================= search ===============
    $(document).ready(function() {
        $("#myInput").on("change", function() {
            var value = $(this).val().toLowerCase();
            console.log(value);   

            $("#myTable tr").filter(function() {
                $(this).toggle($(this).children().eq(1).text().toLowerCase().indexOf(value) > -1)
                console.log($(this).children().eq(1).text());
            });
            
        });
    });
})


function displaytable(){
    var row ="";
    var total =0;
    expense.forEach((e,i) => {
        row += ` <tr id="row_${i}">
        <th scope="row">${e.date}</th>
        <td>${e.category}</td>
        <td>${e.dis}</td>
        <td>${e.amount}</td>
        <td>
            <button class="del" id="del_${i}">delete</button>
            <button class="edit" id="${i}">edit</button>
        </td>
    </tr>`
    total += Number(e.amount); 
    });
    $("#myTable").html(row);
    $('#total').html(total);
}