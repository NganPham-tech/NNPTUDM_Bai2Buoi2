async function getData() {
    try {
        let res = await fetch('http://localhost:3000/posts');
        let posts = await res.json();
        let body = document.getElementById('table_body');
        body.innerHTML = '';

        for (const post of posts) {
           
            const style = post.isDeleted ? 'style="text-decoration: line-through; color: gray;"' : '';
            
            body.innerHTML += `<tr>
                <td ${style}>${post.id}</td>
                <td ${style}>${post.title}</td>
                <td ${style}>${post.views}</td>
                <td>
                    ${post.isDeleted 
                        ? '<span class="text-muted">Đã xoá</span>' 
                        : `<input type='button' value='Delete' onclick='Delete("${post.id}")'>`
                    }
                </td>
            </tr>`;
        }
    } catch (error) {
        console.log(error);
    }
}

async function Save() {
    let idInput = document.getElementById('txt_id').value;
    let title = document.getElementById('txt_title').value;
    let views = document.getElementById('txt_views').value;


    if (!idInput) {
        let resAll = await fetch('http://localhost:3000/posts');
        let allPosts = await resAll.json();
        
   
        let maxId = allPosts.length > 0 
            ? Math.max(...allPosts.map(p => parseInt(p.id))) 
            : 0;
        let newId = (maxId + 1).toString();

        let res = await fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: newId,
                title: title,
                views: views,
                isDeleted: false 
            })
        });
        if (res.ok) console.log("Thêm mới thành công ID: " + newId);

    } else {
        let res = await fetch('http://localhost:3000/posts/' + id, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: title,
                views: views,
                isDeleted: false
            })
        });
        if (res.ok) console.log("Cập nhật thành công");
    }
    getData(); 
}

async function Delete(id) {
    
    let res = await fetch('http://localhost:3000/posts/' + id, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            isDeleted: true
        })
    });

    if (res.ok) {
        console.log("Xoá mềm thành công bài viết ID: " + id);
        getData();
    }
}

getData();