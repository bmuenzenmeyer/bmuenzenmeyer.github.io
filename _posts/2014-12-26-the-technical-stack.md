---
layout: post-code

title: "The Technical Stack"
tags: 'development'
author: Brian Muenzenmeyer
twitter: bmuenzenmeyer

comments: true
---

{{ page.title }}
================

<div class="meta">{{ page.date | date: "%x" }} - <a href="https://twitter.com/bmuenzenmeyer">Brian Muenzenmeyer</a></div>

`Testing code`

{% highlight java linenos %}
def show
  puts "Outputting a very lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong lo-o-o-o-o-o-o-o-o-o-o-o-o-o-o-o-ong line"
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}

{% highlight javascript linenos %}

$(function(){
  alert('test');
});

{% endhighlight %}