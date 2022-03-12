##HOW to use?

Scheme of reqest.Allowed only over (get) reqest
`http://server.com/?q=site&h=headers&t=type`

Types descriptions:

`site` - its string contains url, cancontains get parameters. If parameters more than one instead of an `&`, you need to use `%amp`. 

`headers` - contain string of headers. Header is written as follows `Header:Value`, Where `Header` is name of header and `Value` is value of header. If Headers more than one written with a comma(`,`) like this `Header1:Value1,Header2:Value2,HeaderN:ValueN`.

`type` - contain string with type of request. Allowed now types is `post` and `get`

####of the listed types, only the type `site` is mandatory