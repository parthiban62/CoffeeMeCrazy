class CoffeeBeansController < ApplicationController
	#Get All Coffee Beans
def index
    @beans = CoffeeBean.all
    respond_to do |format|
      format.json { render :json => @beans }
      format.html # index.html.erb
    end
  end
	
	def show
    @bean = CoffeeBean.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
    end
  end
	
def new
    @bean = CoffeeBean.new
    respond_to do |format|
      format.html # new.html.erb
    end
  end
	
	def edit
    @bean = CoffeeBean.find(params[:id])
  end
	
	def create
    @bean = CoffeeBean.new(params[:coffee_bean])
    respond_to do |format|
      if @bean.save
        format.html { redirect_to(@bean, :notice => 'CoffeeBean was successfully created.') }
        format.json { render :json => @bean}
      else
        format.html { render :action => "new" }
        format.json { render :json => @bean.errors.to_a, :status => :unprocessable_entity }
      end
    end
  end
	
	def update
    @bean = CoffeeBean.find(params[:id])
    respond_to do |format|
      if @bean.update_attributes(params[:CoffeeBean])
        format.html { redirect_to(@bean, :notice => 'CoffeeBean was successfully updated.') }
        format.json { render :json => @bean}
      else
        format.html { render :action => "edit" }
        format.json { render :json => @bean.errors.to_a, :status => :unprocessable_entity }
      end
    end
  end
 
  def destroy
    @bean = CoffeeBean.find(params[:id])
    @bean.destroy
    respond_to do |format|
      format.html { redirect_to(coffee_beans_url) }
      format.json { render :json => 'ok'.to_json }
    end
  end
end
