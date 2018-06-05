module Jekyll


  ##############################################################################
  # class Site
  ##############################################################################
  class Site

    attr_accessor :translation_file_content   # Hash that stores parsed translations read from YAML files.
    alias_method :process_extended, :process

    def process
      self.translation_file_content ||= {}
      process_extended
    end
  end

  module LocalizeTagExtensions
    #======================================
    # initialize
    #======================================
    def initialize(tag_name, key, tokens)
      super
      @key = key.strip
    end
    #======================================
    # render
    #======================================
    def render(context)
      if  context[@key].nil? or context[@key].empty? # Check for page variable
        key = @key
      else
        key = context[@key]
      end

      site = context.registers[:site] # Jekyll site object

      lang = site.config['lang']

      unless site.parsed_translations.has_key?(lang)
        puts "Loading translation from file #{site.source}/_i18n/#{lang}.yml"
        site.translation_file_content = YAML.load_file("#{site.source}/_i18n/#{lang}.yml")
        site.parsed_translations[lang] = site.translation_file_content[lang]
      end

      translation = site.parsed_translations[lang].access(key)
      
      if translation.nil? or translation.empty?
         translation = site.parsed_translations[site.config['default_lang']].access(key)

        puts "Missing i18n key: #{lang}:#{key}"
        puts "Using translation '%s' from default language: %s" %[translation, site.config['default_lang']]
      end

      translation.to_s
    end
  end

  class LocalizeTag < Liquid::Tag
    prepend LocalizeTagExtensions
  end
end
