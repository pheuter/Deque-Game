require 'rubygems'
require 'sinatra'
require 'erb'
require 'open-uri'
require 'json'
require 'couchrest'

db = CouchRest.database!("http://deque:game@pheuter.couchone.com:5984/deque")

get '/' do
  @solved, @unsolved = [], []
  JSON.parse(open("http://pheuter.couchone.com:5984/deque/_design/deque/_view/results").read)['rows'].each do |row|
    if row['key'] then @solved << row['value'] else @unsolved << row['value'] end
  end
  @unsolved = @unsolved.find_all { |e| !@solved.include?(e) }
  @solved.uniq!
  @unsolved.uniq!
  erb :index
end

post '/check' do
  if db.view('deque/list')['rows'].collect { |r| {:value => r["value"], :key => r["key"]} }.include?({:value=>params[:query],:key=>true}) then "1" else "0" end
end

post '/submit' do
  db.save_doc({:result => params[:result],:possible => {'1'=>true,'0'=>false}[params[:possible]]})
end