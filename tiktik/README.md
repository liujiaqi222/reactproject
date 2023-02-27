## 初始化项目

项目使用使用next作为前端，sanity作为后端。


在当前目录下直接初始化`./`，并且使用ts。
```bash
# 前端初始化
npx create-next-app@latest ./ --ts
```

```bash
# 后端初始化
npm install -g @sanity/cli
sanity init --coupon javascriptmastery2022
```

## sanity

在初始化好的项目中的schemas文件夹，创建如下文件

```js
// user.js
export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
    }
  ]
}
```

```js
// comment.js
export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    }
  ]
}
```

```js
// postedBy.js
export default {
  name: 'postedBy',
  title: 'Posted By',
  type: 'reference',
  to: [{ type: 'user' }]
}

```

```js
// post.js
export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
    },
    {
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string',
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'user' }],
        },
      ],
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'comment' }],
    },
    {
      name: 'topic',
      title: 'Topic',
      type: 'string',
    },
  ],
}; 

```

在schema.js中添加以下代码
```js
import post from './post'
import user from './user'
import comment from './comment'
import postedBy from './postedBy'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    post, user, comment, postedBy
  ]),
})
```

使用命令`yarn start`就可以得到如下的页面，在页面中可以看到刚刚创建的schema。

![](https://raw.githubusercontent.com/liujiaqi222/warehouse/main/20220704225316.png)

![](https://raw.githubusercontent.com/liujiaqi222/warehouse/main/20220704225120.png)


