# Dockerfile

FROM phusion/passenger-ruby22:0.9.15

# Set correct environment variables.
ENV HOME /root
ENV RAILS_ENV production

# Use baseimage-docker's init process.
CMD ["/sbin/my_init"]

# Expose Nginx HTTP service
EXPOSE 80

# Ensure the log directory exists
RUN mkdir -p /var/log/eb

# Enable Nginx and Passenger
RUN rm -f /etc/service/nginx/down

# Remove the default site
RUN rm /etc/nginx/sites-enabled/default

# Add the nginx site and config
ADD nginx-server.conf /etc/nginx/sites-enabled/upload.prx.org.conf
ADD nginx.conf /etc/nginx/main.d/upload.prx.org.conf
ADD nginx-http.conf /etc/nginx/conf.d/upload.prx.org.conf

# Install Ruby dependencies
WORKDIR /home/app/upload.prx.org/
ADD Gemfile /home/app/upload.prx.org/Gemfile
ADD Gemfile.lock /home/app/upload.prx.org/Gemfile.lock
RUN bundle install --without development test

# Add the Rails app
ADD . /home/app/upload.prx.org
RUN chown -R app:app /home/app/upload.prx.org

# Precompile styles, scripts, etc using the Rails asset pipeline
RUN rake assets:precompile

# RUN bundle exec newrelic deployments

# Clean up APT and bundler when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
