require 'rubygems'
require 'sinatra'
require 'erb'
require 'couchrest'

db = CouchRest.database!("http://deque:game@pheuter.couchone.com:5984/deque")

get '/' do
  erb :index
end

post '/check' do
  if db.view('deque/list')['rows'].collect { |r| {:value => r["value"], :key => r["key"]} }.include?({:value=>params[:query],:key=>true}) then "1" else "0" end
end

post '/submit' do
  db.save_doc({:result => params[:result],:possible => {'1'=>true,'0'=>false}[params[:possible]]})
end